import { FaEdit, FaTrash, FaStar } from "react-icons/fa";
import { useState } from 'react';

const NoteCard = ({ note, onEdit, deleteNote }) => {
  const [isFavorite, setIsFavorite] = useState(false); // Favori durumu

  return (
    <div className="bg-white dark:bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-104 transition duration-300 ease-in-out border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-900 tracking-wide">{note.title}</h2>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`transition-colors duration-300 ${isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
        >
          <FaStar className={`text-2xl ${isFavorite ? 'text-yellow-500' : 'text-gray-400'}`} />
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-800 mb-4 leading-relaxed">{note.description}</p>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => onEdit(note)}
          className="text-blue-500 hover:text-blue-700 transition duration-300 p-2 rounded-full hover:bg-blue-100"
        >
          <FaEdit className="text-2xl" />
        </button>
        <button
          onClick={() => deleteNote(note._id)}
          className="text-red-500 hover:text-red-700 transition duration-300 p-2 rounded-full hover:bg-red-100"
        >
          <FaTrash className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
