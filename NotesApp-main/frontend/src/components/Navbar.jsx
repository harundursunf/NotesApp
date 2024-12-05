import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import { useState } from 'react';
import { FaUserCircle, FaSearch, FaSignOutAlt } from 'react-icons/fa'; // Font Awesome'dan kullanıcı ve çıkış ikonları

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setSearchText('');
    setQuery('');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg p-4 flex justify-between items-center">
      <div className="text-3xl font-bold text-white tracking-wide">
        <Link to="/" className="hover:text-yellow-400 transition duration-300">NotesApp</Link>
      </div>

      {user && (
        <div className="relative">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            value={searchText}
            placeholder="Search notes..."
            onChange={(e) => {
              setSearchText(e.target.value);
              setQuery(e.target.value);
            }}
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
          />

        </div>
      )}

      <div className="flex items-center space-x-6">
        {!user ? (
          <>
            <Link to="/login" className="text-white hover:text-yellow-400 transition duration-300">
              Login
            </Link>
            <Link to="/register" className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300">
              Signup
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-2 text-white font-semibold">
              <FaUserCircle className="text-3xl" />
              <span>{user.name}</span>
            </span>
            <button
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
