import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BatchForm from '../sidebarSection/BatchForm';
import EditBatchForm from '../sidebarSection/EditBatchForm';

const initialNavItems = [
  {
    type: 'item',
    icon: 'bi bi-grid',
    label: 'Dashboard',
    href: '/home',
  },
  {
    type: 'dropdown',
    icon: 'bi bi-menu-button-wide',
    label: 'Batches',
    id: 'components-nav',
    children: [
      { href: '/BatchDetail', label: 'Batch A', description: 'Top-performing students' },
      { href: '/BatchDetail', label: 'Batch B', description: 'High commitment students' },
      { href: '/BatchDetail', label: 'Batch C', description: 'Advanced coursework students' },
      { href: '/BatchDetail', label: 'Batch D', description: 'Specialized attention students' },
      { href: '/BatchDetail', label: 'Batch E', description: 'Accelerated learning opportunities' },
    ],
  },
  {
    type: 'heading',
    label: 'Pages',
  },
  {
    type: 'item',
    icon: 'bi bi-person',
    label: 'Profile',
    to: '/ProfilePage',
  },
];


function Sidebar() {
  const [navItems, setNavItems] = useState(initialNavItems);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [batchToEdit, setBatchToEdit] = useState(null);

  const addBatch = (newBatch) => {
    setNavItems(prevNavItems => {
      const updatedNavItems = [...prevNavItems];
      updatedNavItems[1].children.push(newBatch);
      return updatedNavItems;
    });
    setShowForm(false);
  };

  const editBatch = (updatedBatch) => {
    setNavItems(prevNavItems => {
      const updatedNavItems = [...prevNavItems];
      const batchIndex = updatedNavItems[1].children.findIndex(batch => batch.label === batchToEdit.label);
      updatedNavItems[1].children[batchIndex] = updatedBatch;
      return updatedNavItems;
    });
    setShowEditForm(false);
  };

  const removeBatch = (batchLabel) => {
    setNavItems(prevNavItems => {
      const updatedNavItems = [...prevNavItems];
      updatedNavItems[1].children = updatedNavItems[1].children.filter(
        batch => batch.label !== batchLabel
      );
      return updatedNavItems;
    });
  };

  const handleAddBatchClick = () => {
    setShowForm(true);
  };

  const handleEditBatchClick = (batch) => {
    setBatchToEdit(batch);
    setShowEditForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowEditForm(false);
  };

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {navItems.map((item, index) => {
          if (item.type === 'item') {
            return (
              <li className="nav-item" key={index}>
                {item.href ? (
                  <a className="nav-link" href={item.href}>
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <Link className="nav-link collapsed" to={item.to}>
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          } else if (item.type === 'dropdown') {
            return (
              <li className="nav-item" key={index}>
                <a
                  className="nav-link collapsed"
                  data-bs-toggle="collapse"
                  href={`#${item.id}`}
                  role="button"
                  aria-expanded="false"
                  aria-controls={item.id}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id={item.id} className="nav-content collapse" data-bs-parent="#sidebar-nav">
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex} className="d-flex justify-content-between align-items-center">
                      <a href={child.href}>
                        <i className="bi bi-circle"></i>
                        <span>{child.label}</span>
                      </a>
                      <div>
                        <button
                          className="btn btn-link text-primary"
                          onClick={() => handleEditBatchClick(child)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-link text-danger"
                          onClick={() => removeBatch(child.label)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </li>
                  ))}
                  <li>
                    <button className="btn btn-link nav-link" onClick={handleAddBatchClick}>
                      <i className="bi bi-plus-circle"></i> Add Batch
                    </button>
                  </li>
                </ul>
                {showForm && (
                  <BatchForm onAddBatch={addBatch} onCancel={handleCancel} />
                )}
                {showEditForm && batchToEdit && (
                  <EditBatchForm batch={batchToEdit} onEditBatch={editBatch} onCancel={handleCancel} />
                )}
              </li>
            );
          } else if (item.type === 'heading') {
            return (
              <li className="nav-heading" key={index}>
                {item.label}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
