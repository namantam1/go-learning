import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/go-logo.svg" alt="Go Logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-extrabold text-go-blue">Learning Platform</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-go-blue">Dashboard</Link>
            <Link to="/profile" className="text-gray-600 hover:text-go-blue">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;