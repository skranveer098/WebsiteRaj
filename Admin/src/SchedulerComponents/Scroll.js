import React, { useState, useEffect, useRef } from 'react';
// import SelectedDate from './Day';
// import NotesParent from './Notes';

function SideScroll() {
  const [showMenu, setShowMenu] = useState(false);
  const [notes, setNotes] = useState([
    {
      noteTitle: "Trigonometry, Logarithms, and Sets",
      noteDate: "1:00 PM",
      noteContent: "Prof Rajni Singh."
    },
  ]);
  const [modalType, setModalType] = useState(null);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [newNote, setNewNote] = useState({
    noteTitle: "",
    noteDate: "",
    noteContent: ""
  });
  const [editedNote, setEditedNote] = useState({
    noteTitle: "",
    noteDate: "",
    noteContent: ""
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

  const handleAddNote = () => {
    setNotes([...notes, newNote]);
    setModalType(null);
    setNewNote({
      noteTitle: "",
      noteDate: "",
      noteContent: ""
    });
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
        noteTitle: "",
        noteDate: "",
        noteContent: ""
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
    <div style={{ display: 'flex', flexWrap: 'wrap', position: 'relative', padding: '10px', height: '70vh', width: '45vw', border: '1px solid #d1d1d1', fontFamily: 'GestaRegular, Arial, Helvetica, sans-serif', overflow: 'auto', marginLeft: '2vw', borderRadius: '10px', backgroundColor: '#e8efff' }}>
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
          
      {/* <NotesParent notes={notes} /> */}

      {/* Modals */}
      {modalType === 'add' && (
        <div ref={modalRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#aaa1a1', padding: '20px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', zIndex: 1000 }}>
          <input type="text" placeholder="Title" value={newNote.noteTitle} onChange={(e) => setNewNote({ ...newNote, noteTitle: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <input type="text" placeholder="Date" value={newNote.noteDate} onChange={(e) => setNewNote({ ...newNote, noteDate: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <textarea placeholder="Content" value={newNote.noteContent} onChange={(e) => setNewNote({ ...newNote, noteContent: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <button onClick={handleAddNote} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Add</button>
        </div>
      )}

      {modalType === 'delete' && (
        <div ref={modalRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#aaa1a1', padding: '20px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', zIndex: 1000 }}>
          <p style={{ fontWeight: 'bold' }}>Select a note to delete:</p>
          <ul>
            {notes.map((note, index) => (
              <li style={{ marginTop: '20px', marginBottom: '20px', listStyleType: 'none', color: 'rgb(0, 0, 0)', fontSize: 'larger', cursor: 'pointer' }} key={index} onClick={() => setSelectedNoteIndex(index)}>{note.noteTitle}</li>
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
              <li style={{ marginTop: '20px', marginBottom: '20px', listStyleType: 'none', color: 'rgb(0, 0, 0)', fontSize: 'larger', cursor: 'pointer' }} key={index} onClick={() => setSelectedNoteIndex(index)}>{note.noteTitle}</li>
            ))}
          </ul>
          {selectedNoteIndex !== null && (
            <div>
                            <input type="text" placeholder="Title" value={editedNote.noteTitle} onChange={(e) => setEditedNote({ ...editedNote, noteTitle: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
              <input type="text" placeholder="Date" value={editedNote.noteDate} onChange={(e) => setEditedNote({ ...editedNote, noteDate: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
              <textarea placeholder="Content" value={editedNote.noteContent} onChange={(e) => setEditedNote({ ...editedNote, noteContent: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
              <button onClick={handleEditNote} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Update</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SideScroll;
