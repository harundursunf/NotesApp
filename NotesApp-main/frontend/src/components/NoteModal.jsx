import React, { useEffect, useState } from 'react';

export const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Both title and description are required.");
      return;
    }

    if (currentNote) {
      editNote(currentNote._id, title, description);
    } else {
      addNote(title, description);
    }

    closeModal();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full transform transition-transform duration-300 ease-in-out">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {currentNote ? "Edit Note" : "Add New Note"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-500 focus:outline-none transition duration-300"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-500 focus:outline-none transition duration-300"
            required
          />
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {currentNote ? "Update Note" : "Add Note"}
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
