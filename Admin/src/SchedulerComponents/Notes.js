import React from 'react';
import CardComponent from './CardComponent';

const NotesParent = ({ notes }) => {
    return (
        <div className="page-content container note-has-grid">
            <div id="note-full-container" className="note-has-grid row" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {notes.map((note, index) => (
                    <CardComponent
                        key={index}
                        noteTitle={note.noteTitle}
                        noteDate={note.noteDate}
                        noteContent={note.noteContent}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotesParent;
