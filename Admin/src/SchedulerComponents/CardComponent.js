import React from 'react';

const CardComponent = ({ noteTitle, noteDate, noteContent }) => {
    return (
        <div style={{ flexBasis: '33.3333%', maxWidth: '33.3333%', padding: '0 15px', marginBottom: '30px' }}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minWidth: '0', wordWrap: 'break-word', backgroundColor: '#fff', backgroundClip: 'border-box', border: '0 solid transparent', borderRadius: '10px', margin: '10px', padding: '1.57rem' }}>
                <span style={{ position: 'absolute', width: '3px', height: '35px', left: '0', backgroundColor: 'rgba(82, 95, 127, 0.5)' }}></span>
                <h5 style={{ marginBottom: '0', fontSize: '1rem', width: '75%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} data-noteheading={noteTitle}>
                    {noteTitle} <i className="fa fa-circle" style={{ color: 'rgba(82, 95, 127, 0.5)', fontSize: '10px', marginLeft: '4px' }}></i>
                </h5>
                <p style={{ fontSize: '0.75rem', color: '#6c757d' }}>{noteDate}</p>
                <div style={{ marginTop: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', color: '#6c757d' }} data-notecontent={noteContent}>
                        {noteContent}
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}></div>
            </div>
        </div>
    );
};

export default CardComponent;
