import React, { useState, useEffect } from 'react';
// import Home from '../Home';
import StudentDetail from './StudentDetail';
import { FaEdit, FaTrash } from 'react-icons/fa';

const BatchDetail = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showStudentDetail, setShowStudentDetail] = useState(false);
    const [studentToEdit, setStudentToEdit] = useState(null);

    useEffect(() => {
        // Mock data fetching
        const fetchData = () => {
            const initialData = [
                { firstName: 'Unity',lastName: 'Pugh', enrollmentNo: '9958', emailId: 'rajnisingh9031@gmail.com', password: 'UnityPugh', startDate: '2005/02/11', endDate: '37%' },
                // Add more mock data here
            ];
            setData(initialData);
        };

        fetchData();
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const filteredData = sortedData.filter(item =>
        Object.values(item).some(val =>
            val.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handleAddStudentClick = () => {
        setStudentToEdit(null);
        setShowStudentDetail(true);
    };

    const handleCloseStudentDetail = () => {
        setShowStudentDetail(false);
    };

    const handleAddStudent = (student) => {
        if (studentToEdit) {
            const updatedData = data.map((item) =>
                item.enrollmentNo === studentToEdit.enrollmentNo ? student : item
            );
            setData(updatedData);
        } else {
            setData([...data, student]);
        }
    };

    const handleEditStudent = (student) => {
        setStudentToEdit(student);
        setShowStudentDetail(true);
    };

    const handleDeleteStudent = (enrollmentNo) => {
        const updatedData = data.filter((student) => student.enrollmentNo !== enrollmentNo);
        setData(updatedData);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ marginBottom: '20px' }}>
                <div className="pagetitle" style={{ marginBottom: '20px' }}>
                    <h1>Batch A</h1>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Batch Details</h5>
                                    <p>
                                        Batch A in coaching classes typically consists of top-performing students who excel academically or demonstrate a high level of commitment to their studies. These students often receive specialized attention and advanced coursework, aimed at further challenging and nurturing their abilities. Additionally, Batch A may have access to extra resources or accelerated learning opportunities to enhance their educational experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label>
                        <select
                            style={{ marginLeft: '10px', padding: '5px' }}
                            value={rowsPerPage}
                            onChange={(e) => setRowsPerPage(Number(e.target.value))}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="-1">All</option>
                        </select> entries per page
                    </label>
                </div>
                <div>
                    <input
                        style={{ padding: '5px' }}
                        placeholder="Search..."
                        type="search"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('firstName')}>
                            <button style={{ all: 'unset', cursor: 'pointer' }}>First Name</button>
                        </th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('lastName')}>
                            <button style={{ all: 'unset', cursor: 'pointer' }}>Last Name</button>
                        </th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('enrollmentNo')}>
                            <button style={{ all: 'unset', cursor: 'pointer' }}>Enrollment No.</button>
                        </th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('emailId')}>
                            <button style={{ all: 'unset', cursor: 'pointer' }}>Email Id</button>
                        </th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('password')}>
                            <button style={{ all: 'unset', cursor: 'pointer' }}>Password</button>
                        </th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('startDate')}>
                            <button style={{ all: 'unset', cursor: 'pointer' }}>Joining Date</button>
                        </th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('endDate')}>
                            <button style={{ all: 'unset', cursor: 'pointer' }}>End Date</button>
                        </th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((row, index) => (
                        <tr key={index} style={{ cursor: 'pointer', transition: 'background-color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{row.firstName}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{row.lastName}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{row.enrollmentNo}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{row.emailId}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{row.password}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{row.startDate}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{row.endDate}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-around' }}>
                                <FaEdit onClick={() => handleEditStudent(row)} style={{ cursor: 'pointer', color: '#007bff' }} />
                                <FaTrash onClick={() => handleDeleteStudent(row.enrollmentNo)} style={{ cursor: 'pointer', color: 'red' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                <div style={{ fontSize: '14px' }}>
                    Showing {indexOfFirstRow + 1} to {indexOfLastRow} of {filteredData.length} entries
                </div>
                <nav style={{ display: 'flex' }}>
                    <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                        <li style={{ margin: '0 5px', ...(currentPage === 1 ? { display: 'none' } : {}) }}>
                            <button
                                style={{
                                    padding: '5px 10px',
                                    border: 'none',
                                    backgroundColor: currentPage === 1 ? '#ddd' : '#007bff',
                                    color: 'white',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                ‹
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, i) => (
                            <li key={i} style={{ margin: '0 5px' }}>
                                <button
                                    style={{
                                        padding: '5px 10px',
                                        border: 'none',
                                        backgroundColor: currentPage === i + 1 ? '#007bff' : '#ddd',
                                        color: 'white',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li style={{ margin: '0 5px', ...(currentPage === totalPages ? { display: 'none' } : {}) }}>
                            <button
                                style={{
                                    padding: '5px 10px',
                                    border: 'none',
                                    backgroundColor: currentPage === totalPages ? '#ddd' : '#007bff',
                                    color: 'white',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                ›
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 0' }}>
                <button
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    onClick={handleAddStudentClick}
                >
                    Add Student
                </button>
            </div>
            {showStudentDetail && (
                <StudentDetail
                    onAddStudent={handleAddStudent}
                    onClose={handleCloseStudentDetail}
                    studentToEdit={studentToEdit}
                />
            )}
        </div>
    );
};

export default BatchDetail;
