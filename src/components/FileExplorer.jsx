import { useState } from 'react';
import { FolderIcon, DocumentIcon, ChevronDownIcon, ChevronRightIcon, Bars3Icon } from '@heroicons/react/24/outline';
import * as ContextMenu from '@radix-ui/react-context-menu';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';

export default function FileExplorer(props) {
  // eslint-disable-next-line react/prop-types
  const { files, onFileSelect, selectedFile, onUpdateFiles } = props;
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNewFileDialog, setShowNewFileDialog] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [newFileName, setNewFileName] = useState('');

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleAddFile = (path) => {
    setCurrentPath(path);
    setNewFileName('');
    setShowNewFileDialog(true);
  };

  const handleRenameFile = (path) => {
    setCurrentPath(path);
    setNewFileName(path.split('/').pop());
    setShowRenameDialog(true);
  };

  const handleDeleteFile = (path) => {
    const newFiles = { ...files };
    delete newFiles[path];
    onUpdateFiles(newFiles);
  };

  const createNewFile = () => {
    const newPath = currentPath ? `${currentPath}/${newFileName}` : newFileName;
    const newFiles = {
      ...files,
      [newPath]: {
        content: '',
        isMain: false
      }
    };
    onUpdateFiles(newFiles);
    setShowNewFileDialog(false);
  };

  const renameFile = () => {
    const oldPath = currentPath;
    const newPath = oldPath.split('/').slice(0, -1).concat(newFileName).join('/');
    
    const newFiles = { ...files };
    newFiles[newPath] = newFiles[oldPath];
    delete newFiles[oldPath];
    
    onUpdateFiles(newFiles);
    setShowRenameDialog(false);
  };

  const renderContextMenu = (path, isFolder) => (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="w-full">
        <div className={clsx(
          "flex items-center space-x-1 w-full p-1 rounded text-left",
          selectedFile === path && !isFolder ? 'bg-blue-100' : 'hover:bg-gray-100'
        )}>
          {isFolder ? (
            <>
              {expandedFolders.has(path) ? (
                <ChevronDownIcon className="w-4 h-4" />
              ) : (
                <ChevronRightIcon className="w-4 h-4" />
              )}
              <FolderIcon className="w-4 h-4 text-yellow-500" />
            </>
          ) : (
            <DocumentIcon className="w-4 h-4 text-gray-500" />
          )}
          <span>{path.split('/').pop()}</span>
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="min-w-[160px] bg-white rounded-md shadow-lg p-1 z-50">
          {isFolder && (
            <ContextMenu.Item
              className="px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 rounded"
              onClick={() => handleAddFile(path)}
            >
              New File
            </ContextMenu.Item>
          )}
          {!isFolder && (
            <>
              <ContextMenu.Item
                className="px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 rounded"
                onClick={() => handleRenameFile(path)}
              >
                Rename
              </ContextMenu.Item>
              <ContextMenu.Item
                className="px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 text-red-600 rounded"
                onClick={() => handleDeleteFile(path)}
              >
                Delete
              </ContextMenu.Item>
            </>
          )}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );

  const renderTree = (items, basePath = '') => {
    const folders = new Map();
    const filesList = [];

    Object.entries(items).forEach(([path, content]) => {
      const parts = path.split('/');
      if (parts.length > 1) {
        const folderName = parts[0];
        const remainingPath = parts.slice(1).join('/');
        if (!folders.has(folderName)) {
          folders.set(folderName, {});
        }
        folders.get(folderName)[remainingPath] = content;
      } else {
        filesList.push([path, content]);
      }
    });

    return (
      <ul className="space-y-1">
        {Array.from(folders).map(([folderName, folderContent]) => {
          const folderPath = basePath ? `${basePath}/${folderName}` : folderName;
          const isExpanded = expandedFolders.has(folderPath);

          return (
            <li key={folderPath}>
              <div onClick={() => toggleFolder(folderPath)}>
                {renderContextMenu(folderPath, true)}
              </div>
              {isExpanded && (
                <div className="ml-4">
                  {renderTree(folderContent, folderPath)}
                </div>
              )}
            </li>
          );
        })}

        {filesList.map(([fileName, fileContent]) => {
          const filePath = basePath ? `${basePath}/${fileName}` : fileName;
          return (
            <li key={filePath} onClick={() => onFileSelect(filePath)}>
              {renderContextMenu(filePath, false)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b">
        <span className="font-medium">Files</span>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Bars3Icon className="w-5 h-5" />
        </button>
      </div>
      <div className={clsx(
        "flex-1 overflow-auto transition-all duration-200",
        isCollapsed ? "w-12" : "w-full"
      )}>
        {!isCollapsed && (
          <div className="p-2">
            {renderTree(files)}
          </div>
        )}
      </div>

      <Dialog.Root open={showNewFileDialog} onOpenChange={setShowNewFileDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-96">
            <Dialog.Title className="text-lg font-semibold mb-4">New File</Dialog.Title>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Enter file name"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowNewFileDialog(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={createNewFile}
                className="px-4 py-2 bg-go-blue text-white rounded hover:bg-go-blue-dark"
              >
                Create
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-96">
            <Dialog.Title className="text-lg font-semibold mb-4">Rename File</Dialog.Title>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Enter new file name"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowRenameDialog(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={renameFile}
                className="px-4 py-2 bg-go-blue text-white rounded hover:bg-go-blue-dark"
              >
                Rename
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}