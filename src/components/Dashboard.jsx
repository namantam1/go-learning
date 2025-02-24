import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeUserProgress, getUserProgress } from '../services/storage';

function Dashboard() {
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('data/modules.json');
        const data = await response.json();
        setModules(data.modules);
        
        // Initialize progress in localStorage if it doesn't exist
        initializeUserProgress(data.modules);
        
        // Get progress from localStorage
        const savedProgress = getUserProgress();
        setProgress(savedProgress);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Go Learning</h1>
        <p className="mt-2 text-lg text-gray-600">Master Go programming one step at a time</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const moduleProgress = progress.find(p => p.moduleId === module.id) || { completed: 0, total: module.levels };
          
          return (
            <Link
              key={module.id}
              to={`/module/${module.id}`}
              className="card hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900">{module.title}</h2>
              <p className="mt-2 text-gray-600">{module.description}</p>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{moduleProgress.total} Levels</span>
                  <span>{moduleProgress.completed} Completed</span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-go-blue rounded-full"
                    style={{
                      width: `${(moduleProgress.completed / moduleProgress.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;