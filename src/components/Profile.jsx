import { useState, useEffect } from 'react';
import { getUserProgress } from '../services/storage';

function Profile() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/data/user.json');
        const data = await response.json();
        
        // Get progress from localStorage
        const savedProgress = getUserProgress();
        
        setUser({
          ...data.user,
          progress: savedProgress
        });
        setProgress(savedProgress);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Info Card with Avatar */}
        <div className="card md:col-span-2">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
              <button
                className="text-sm text-go-blue hover:text-go-blue-dark font-medium"
                onClick={() => {
                  alert('Image upload functionality would go here');
                }}
              >
                Change Picture
              </button>
            </div>

            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-semibold mb-4">User Information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-500">Name</label>
                <div className="mt-1 text-lg">{user.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <div className="mt-1 text-lg">{user.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Member Since</label>
                <div className="mt-1 text-lg">{new Date(user.joinDate).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Completed Modules</label>
              <div className="mt-1 text-2xl font-bold text-go-blue">
                {progress.filter(p => p.completed === p.total).length}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Completed Levels</label>
              <div className="mt-1 text-2xl font-bold text-go-blue">
                {progress.reduce((total, p) => total + p.completed, 0)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Current Streak</label>
              <div className="mt-1 text-2xl font-bold text-go-blue">{user.streak} days</div>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="card md:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Recent Progress</h2>
          <div className="space-y-4">
            {progress.map((module) => (
              <div key={module.moduleId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">{module.title}</h3>
                  <p className="text-sm text-gray-600">
                    Completed {module.completed} of {module.total} levels
                  </p>
                </div>
                <div className="w-48 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-go-blue rounded-full"
                    style={{ width: `${(module.completed / module.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;