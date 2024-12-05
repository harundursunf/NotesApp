import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { NoteModal } from '../components/NoteModal';
import NoteCard from '../components/NoteCard';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredNotes, setFilteredNote] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNote(
      notes.filter((note) => {
        const titleMatch = note.title && note.title.toLowerCase().includes(query.toLowerCase());
        const descriptionMatch = note.description && note.description.toLowerCase().includes(query.toLowerCase());
        return titleMatch || descriptionMatch;
      })
    );
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalOpen = () => {
    setModalOpen(false);
  };

  const onAddNewNote = () => {
    setCurrentNote(null);
    setModalOpen(true);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/note/add',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModalOpen();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Note deleted");
        fetchNotes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModalOpen();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setQuery={setQuery} />
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <NoteCard
              key={note._id} // Her öğeye key eklemek performans için önemli
              note={note}
              deleteNote={deleteNote}
              onEdit={onEdit}
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-600">No Notes</p>
        )}
      </div>
      <button
        onClick={onAddNewNote}
        className="fixed right-6 bottom-6 bg-red-600 text-white p-5 rounded-full shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105 flex items-center justify-center"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>

      {isModalOpen && (
        <NoteModal
          closeModal={closeModalOpen}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
