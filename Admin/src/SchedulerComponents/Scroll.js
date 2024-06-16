import React, { useState, useEffect, useRef, useContext } from 'react';
// import SelectedDate from './Day';
import NotesParent from './Notes';
import {useParams } from 'react-router-dom';
import axios from 'axios';
import { DateContext } from './DateContext';

function SideScroll() {
  const [showMenu, setShowMenu] = useState(false);
  const { batchId } = useParams();
  const { clickedDate } = useContext(DateContext);
  const [notes, setNotes] = useState([
    {
      topic: "Trigonometry, Logarithms, and Sets",
      time: "1:00 PM",
      professor: "Prof Rajni Singh."
    },
  ]);
  const [modalType, setModalType] = useState(null);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  const [newNote, setNewNote] = useState({
    topic: "",
    time: "",
    professor: ""
  });
  const [editedNote, setEditedNote] = useState({
    topic: "",
    time: "",
    professor: ""
  });

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleEditModal = () => {
    setModalType('edit');
  };

  const handleAddModal = () => {
    setModalType('add');
  };

  const handleDeleteModal = () => {
    setModalType('delete');
  };

const handleAddNote = async () => {
  try {
    const payload = {
      classDate: clickedDate,
      classes: [newNote]
      }
      const response = await axios.post(
        `http://localhost:7000/api/batches/${batchId}/schedule`, // Adjust API endpoint as per your backend route
        [payload]
      );
      console.log('Note added:', response.data);
      setNotes([...notes, response.data]); // Update state with the newly added note from response
      setModalType(null);
      setNewNote({
        topic: "",
        time: "",
        professor: ""
      });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleDeleteNote = () => {
    if (selectedNoteIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes.splice(selectedNoteIndex, 1);
      setNotes(updatedNotes);
      setSelectedNoteIndex(null);
    }
    setModalType(null);
  };

  const handleEditNote = () => {
    if (selectedNoteIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[selectedNoteIndex] = editedNote;
      setNotes(updatedNotes);
      setSelectedNoteIndex(null);
      setEditedNote({
        topic: "",
        time: "",
        professor: ""
      });
    }
    setModalType(null);
  };

  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalType(null);
      }
    };

    if (modalType) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalType]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', position: 'relative', padding: '10px', height: '70vh', width: '45vw', border: '1px solid #d1d1d1', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 10', fontFamily: 'GestaRegular, Arial, Helvetica, sans-serif', overflow: 'auto', marginLeft: '2vw', borderRadius: '10px', backgroundColor: '#e8efff' }}>
      <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }} onClick={handleMenuToggle}>
        <i className="fa fa-ellipsis-v"></i>
      </div>
      {showMenu && (
        <div style={{ position: 'absolute', top: '40px', right: '10px', background: '#efdddd', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', zIndex: 1000 }}>
          <div style={{ padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={handleEditModal}>Edit Note</div>
          <div style={{ padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={handleAddModal}>Add New Note</div>
          <div style={{ padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={handleDeleteModal}>Delete Note</div>
        </div>
      )}
          {/* <SelectedDate date={newNote.noteDate || editedNote.noteDate} />
          
            <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }} onClick={handleMenuToggle}>
        <i className="fa fa-ellipsis-v"></i>
      </div>

      {showMenu && (
        <div style={{ position: 'absolute', top: '40px', right: '10px', background: '#efdddd', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', zIndex: 1000 }}>
          <div style={{ padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={handleEditModal}>Edit Note</div>
          <div style={{ padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={handleAddModal}>Add New Note</div>
          <div style={{ padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={handleDeleteModal}>Delete Note</div>
        </div>
          )} */}
          
      <NotesParent notes={notes} />

      {/* Modals */}
      {modalType === 'add' && (
        <div ref={modalRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#aaa1a1', padding: '20px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', zIndex: 1000 }}>
          <input type="text" placeholder="topic" value={newNote.topic} onChange={(e) => setNewNote({ ...newNote, topic: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <input type="text" placeholder="time" value={newNote.time} onChange={(e) => setNewNote({ ...newNote, time: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <textarea placeholder="Professor" value={newNote.professor} onChange={(e) => setNewNote({ ...newNote, professor: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <button onClick={handleAddNote} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Add</button>
        </div>
      )}

      {modalType === 'delete' && (
        <div ref={modalRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#aaa1a1', padding: '20px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', zIndex: 1000 }}>
          <p style={{ fontWeight: 'bold' }}>Select a note to delete:</p>
          <ul>
            {notes.map((note, index) => (
              <li style={{ marginTop: '20px', marginBottom: '20px', listStyleType: 'none', color: 'rgb(0, 0, 0)', fontSize: 'larger', cursor: 'pointer' }} key={index} onClick={() => setSelectedNoteIndex(index)}>{note.topic}</li>
            ))}
          </ul>
          <button onClick={handleDeleteNote} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Delete</button>
        </div>
      )}

      {modalType === 'edit' && (
        <div ref={modalRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#aaa1a1', padding: '20px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', zIndex: 1000 }}>
          <p style={{ fontWeight: 'bold' }}>Select a note to edit:</p>
          <ul>
            {notes.map((note, index) => (
              <li style={{ marginTop: '20px', marginBottom: '20px', listStyleType: 'none', color: 'rgb(0, 0, 0)', fontSize: 'larger', cursor: 'pointer' }} key={index} onClick={() => setSelectedNoteIndex(index)}>{note.topic}</li>
            ))}
          </ul>
          {selectedNoteIndex !== null && (
            <div>
                            <input type="text" placeholder="topic" value={editedNote.topic} onChange={(e) => setEditedNote({ ...editedNote, topic: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
              <input type="text" placeholder="Date" value={editedNote.time} onChange={(e) => setEditedNote({ ...editedNote, time: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
              <textarea placeholder="Content" value={editedNote.professor} onChange={(e) => setEditedNote({ ...editedNote, professor: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
              <button onClick={handleEditNote} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Update</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SideScroll;
