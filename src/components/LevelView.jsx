import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import Split from 'split.js';
import { submitCode } from '../services/judge';
import FileExplorer from './FileExplorer';
import { saveCompletedLevel, saveCodeFiles, getCodeFiles } from '../services/storage';

function LevelView() {
  const { moduleId, levelId } = useParams();
  const [level, setLevel] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState({});
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const splitInitialized = useRef(false);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await fetch('/data/levels.json');
        const data = await response.json();
        const foundLevel = data.levels.find(l => l.id === parseInt(levelId));
        setLevel(foundLevel);
        if (foundLevel) {
          // Check for saved code in localStorage
          const savedFiles = getCodeFiles()[levelId];
          setFiles(savedFiles || foundLevel.files);
          // Select the main file by default
          const mainFile = Object.entries(savedFiles || foundLevel.files).find(([_, content]) => content.isMain)?.[0];
          setSelectedFile(mainFile);
        }
      } catch (error) {
        console.error('Error fetching level:', error);
        setError('Failed to load level data');
      }
    };

    fetchLevel();
  }, [levelId]);

  useEffect(() => {
    if (level && !splitInitialized.current) {
      const timer = setTimeout(() => {
        try {
          const split = Split(['#file-explorer', '#editor-section'], {
            sizes: [20, 80],
            minSize: [200, 400],
            gutterSize: 2,
            cursor: 'col-resize',
            snapOffset: 0,
          });
          splitInitialized.current = true;

          return () => {
            split.destroy();
            splitInitialized.current = false;
          };
        } catch (error) {
          console.error('Failed to initialize Split.js:', error);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [level]);

  const handleFileSelect = (filePath) => {
    setSelectedFile(filePath);
  };

  const handleCodeChange = (newValue) => {
    const updatedFiles = {
      ...files,
      [selectedFile]: {
        ...files[selectedFile],
        content: newValue
      }
    };
    setFiles(updatedFiles);
    saveCodeFiles(levelId, updatedFiles);
  };

  const handleUpdateFiles = (newFiles) => {
    setFiles(newFiles);
    saveCodeFiles(levelId, newFiles);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setError(null);
    setOutput('');

    try {
      const mainFile = Object.entries(files).find(([_, content]) => content.isMain)?.[1];
      if (!mainFile) {
        throw new Error('No main file found');
      }
      const result = await submitCode(mainFile.content);

      if (result.success) {
        setOutput(result.output);
        const expectedOutput = level.expectedOutput;
        if (expectedOutput && result.output.trim() === expectedOutput.trim()) {
          setOutput(prev => prev + '\n\nCongratulations! Your solution is correct! 🎉');
          saveCompletedLevel(parseInt(moduleId), parseInt(levelId));
        }
      } else {
        setError(result.error || 'Failed to execute code');
        setOutput(result.output || '');
      }
    } catch (error) {
      setError('Failed to execute code: ' + error.message);
    } finally {
      setIsRunning(false);
    }
  };

  if (!level) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Level not found</h2>
        <p className="mt-2 text-gray-600">This level doesn&lsquo;t exist yet.</p>
        <Link
          to={`/module/${moduleId}`}
          className="mt-4 inline-block text-go-blue hover:underline"
        >
          ← Back to Module
        </Link>
      </div>
    );
  }

  // Add a helper function to copy text to the clipboard
  const copyText = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link
          to={`/module/${moduleId}`}
          className="text-go-blue hover:underline"
        >
          ← Back to Module
        </Link>
        <h1 className="text-3xl font-bold">{level.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{level.description}</p>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
            <ul className="list-disc list-inside text-gray-600">
              {level.prerequisites.map((prereq, index) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Learning Materials</h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-600 mb-4">{level.learningMaterials.explanation}</p>
              
              <h3 className="text-lg font-semibold mb-2">Examples</h3>
              <div className="space-y-4">
                {level.learningMaterials.examples.map((example, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{example.title}</h4>
                      <button
                        onClick={() => copyText(example.code)}
                        className="text-sm text-go-blue hover:text-go-blue-dark"
                      >
                        Copy Code
                      </button>
                    </div>
                      <div className="mb-2">
                        <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto">
                          {example.code}
                        </pre>
                      </div>
                    <p className="text-sm text-gray-600">{example.explanation}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-2">Additional Resources</h3>
              <ul className="space-y-2">
                {level.learningMaterials.references.map((ref, index) => (
                  <li key={index}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-go-blue hover:text-go-blue-dark hover:underline"
                    >
                      {ref.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Solution</h2>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="text-go-blue hover:text-go-blue-dark font-medium"
              >
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </button>
            </div>
            {showSolution && (
              <div className="relative bg-gray-50 p-4 rounded-lg">
                <button
                  onClick={() => copyText(level.solution[selectedFile] || '')}
                  className="absolute top-2 right-2 text-go-blue hover:text-go-blue-dark"
                  title="Copy Solution"
                >
                  Copy
                </button>
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {level.solution[selectedFile] || 'Select a file to view its solution'}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex h-[600px] border border-gray-200 rounded-lg overflow-hidden">
            <div id="file-explorer" className="border-r border-gray-200 bg-white">
              <FileExplorer
                files={files}
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onUpdateFiles={handleUpdateFiles}
              />
            </div>
            <div id="editor-section" className="flex-1">
              {selectedFile && (
                <Editor
                  height="100%"
                  defaultLanguage="go"
                  theme="vs-light"
                  value={files[selectedFile]?.content}
                  onChange={handleCodeChange}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className={`btn btn-primary ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
          </div>

          <div className="card bg-gray-900 text-white font-mono">
            <h3 className="text-sm text-gray-400 mb-2">Output:</h3>
            {error && (
              <div className="text-red-400 mb-2">
                {error}
              </div>
            )}
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LevelView;