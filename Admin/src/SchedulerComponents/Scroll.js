import React, { useState, useEffect, useRef, useContext } from 'react';
import NotesParent from './Notes';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DateContext } from './DateContext';


const APP = process.env.REACT_APP_API_URL;

function SideScroll() {
  const [showMenu, setShowMenu] = useState(false);
  const { batchId } = useParams();
  const { clickedDate } = useContext(DateContext);
  const [notes, setNotes] = useState([]);
  const [modalType, setModalType] = useState(false);
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

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${APP}/api/batches/${batchId}/schedule/${clickedDate}`);
        setNotes(response.data.classes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    if (batchId && clickedDate) {
      fetchNotes();
    }
  }, [batchId, clickedDate]);

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
      };
      const response = await axios.post(
        `${APP}/api/batches/${batchId}/schedule`, 
        [payload]
      );
      
      // Update notes for the current clickedDate only
      setNotes([...notes, ...response.data.classes]);
      setNewNote({
        topic: "",
        time: "",
        professor: ""
      });
      
    } catch (error) {
      console.error('Error adding note:', error);
    }
    setModalType(false);
    window.location.reload();
  };

  const handleDeleteNote = async () => {
    if (selectedNoteIndex !== null) {
      const noteToDelete = notes[selectedNoteIndex];
      const classId = noteToDelete._id;

      try {
        const response = await axios.delete(`${APP}/api/batches/${batchId}/schedule/${clickedDate}/${classId}`);
        console.log('Note deleted:', response.data);

        const updatedNotes = notes.filter((_, index) => index !== selectedNoteIndex);
        setNotes(updatedNotes);
        setSelectedNoteIndex(null);
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
    setModalType(null);
  };

  const handleEditNote = async () => {
    if (selectedNoteIndex !== null) {
      const noteToEdit = notes[selectedNoteIndex];
      const classId = noteToEdit._id;

      try {
        const payload = {
          topic: editedNote.topic,
          time: editedNote.time,
          professor: editedNote.professor,
          latestClassDate: clickedDate
        };
        const response = await axios.put(`${APP}/api/batches/${batchId}/schedule/${clickedDate}/${classId}`, payload);
        console.log('Note edited:', response.data);

        const updatedNotes = notes.map((note, index) =>
          index === selectedNoteIndex ? response.data : note
        );
        setNotes(updatedNotes);
        setSelectedNoteIndex(null);
        setEditedNote({
          topic: "",
          time: "",
          professor: ""
        });
      } catch (error) {
        console.error('Error editing note:', error);
      }
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
    <div style={{ display: 'flex', flexWrap: 'wrap', position: 'relative', padding: '10px', height: '70vh', width: '45vw', border: '1px solid #d1d1d1', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 10px', fontFamily: 'GestaRegular, Arial, Helvetica, sans-serif', overflow: 'auto', marginLeft: '2vw', borderRadius: '10px', backgroundColor: '#e8efff' }}>
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

      <NotesParent notes={notes} />

      {modalType === 'add' && (
        <div ref={modalRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#aaa1a1', padding: '20px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', zIndex: 1000 }}>
          <input type="text" placeholder="Topic" value={newNote.topic} onChange={(e) => setNewNote({ ...newNote, topic: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <input type="text" placeholder="Time" value={newNote.time} onChange={(e) => setNewNote({ ...newNote, time: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <textarea placeholder="Professor" value={newNote.professor} onChange={(e) => setNewNote({ ...newNote, professor: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <button onClick={handleAddNote} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Add</button>
        </div>
      )}

      {modalType === 'delete' && (
        <div ref={modalRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#aaa1a1', padding: '20px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', zIndex: 1000 }}>
          <p style={{ fontWeight: 'bold' }}>Select a note to delete:</p>
          <ul>
            {notes.map((note, index) => (
              <li style={{ marginTop: '20px', marginBottom: '20px', listStyleType: 'none', color: 'rgb(0,             0, 0)', fontSize: 'larger', cursor: 'pointer' }} key={index} onClick={() => setSelectedNoteIndex(index)}>{note.topic}</li>
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
              <input type="text" placeholder="Topic" value={editedNote.topic} onChange={(e) => setEditedNote({ ...editedNote, topic: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
              <input type="text" placeholder="Time" value={editedNote.time} onChange={(e) => setEditedNote({ ...editedNote, time: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
              <textarea placeholder="Professor" value={editedNote.professor} onChange={(e) => setEditedNote({ ...editedNote, professor: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
              <button onClick={handleEditNote} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Update</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SideScroll;