import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ModuleView() {
  const { moduleId } = useParams();
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch('/data/levels.json');
        const data = await response.json();
        setLevels(data.levels);
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };

    fetchLevels();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-go-blue hover:underline">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold">Module {moduleId}: Basics of Go</h1>
      </div>

      <div className="space-y-4">
        {levels.map((level) => (
          <Link
            key={level.id}
            to={`/module/${moduleId}/level/${level.id}`}
            className={`card block ${
              level.completed ? 'border-l-4 border-green-500' : ''
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{level.title}</h2>
                <p className="mt-1 text-gray-600">{level.description}</p>
                <div className="mt-2">
                  <h3 className="text-sm font-medium text-gray-500">Prerequisites:</h3>
                  <ul className="mt-1 text-sm text-gray-600">
                    {level.prerequisites.map((prereq, index) => (
                      <li key={index}>• {prereq}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {level.completed ? (
                <span className="text-green-500">✓ Completed</span>
              ) : (
                <span className="text-gray-400">In Progress</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ModuleView;