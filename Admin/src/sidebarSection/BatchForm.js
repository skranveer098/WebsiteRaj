import React, { useState, useEffect } from 'react';

function BatchForm({ onAddBatch, onEditBatch, onCancel, isEditMode, batchToEdit }) {
  const [batchName, setBatchName] = useState('');
  const [batchDescription, setBatchDescription] = useState('');

  // Set initial values if in edit mode
  useEffect(() => {
    if (isEditMode && batchToEdit) {
      setBatchName(batchToEdit.label);
      setBatchDescription(batchToEdit.description);
    }
  }, [isEditMode, batchToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      onEditBatch({ ...batchToEdit, label: batchName, description: batchDescription });
    } else {
      if (batchName) {
        onAddBatch({ href: '/BatchDetail', label: batchName, description: batchDescription });
        setBatchName('');
        setBatchDescription('');
      }
    }
  };

  return (
    <div className="batch-form-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="batchName" className="form-label">Batch Name</label>
          <input
            type="text"
            className="form-control"
            id="batchName"
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="batchDescription" className="form-label">Batch Description</label>
          <textarea
            className="form-control"
            id="batchDescription"
            value={batchDescription}
            onChange={(e) => setBatchDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">{isEditMode ? 'Update' : 'Done'}</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default BatchForm;
