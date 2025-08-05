import React, { useState } from 'react';
import { FaUser, FaEye, FaSort, FaEllipsisV, FaTrash, FaEnvelope, FaCheck, FaTimes } from 'react-icons/fa';
import { Link, useNavigate} from 'react-router-dom';


function DetailedListCard({ headings, collection }) {
    const navigate = useNavigate();
    const [hiddenApplicants, setHiddenApplicants] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectMode, setSelectMode] = useState(false);
    const [action, setAction] = useState(null);
    const [showKebabMenu, setShowKebabMenu] = useState(false);

    const toggleVisibility = (id) => {
        setHiddenApplicants(prevState =>
            prevState.includes(id) ? prevState.filter(applicantId => applicantId !== id) : [...prevState, id]
        );
    };

    const sortedCollection = [...collection].sort((a, b) => {
        const { key, direction } = sortConfig;
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
    });

    const handleSort = (key) => {
        setSortConfig(prevState => ({
            key,
            direction: prevState.direction === 'ascending' ? 'descending' : 'ascending'
        }));
    };

    const handleSelectMode = () => {
        setSelectMode(!selectMode);
        setSelectedRows([]);
    };

    const handleRowSelect = (id) => {
        setSelectedRows(prevState =>
            prevState.includes(id) ? prevState.filter(rowId => rowId !== id) : [...prevState, id]
        );
    };

    const handleAction = (actionType) => {
        setAction(actionType);
    };

    const handleConfirmAction = () => {
        // API call implementation here
        setAction(null);
        setSelectedRows([]);
    };

    const handleRowClick = (id) => {
        
        navigate(`/admin/app-submissions/${id}`); 

    };

    return (
        <div className="rounded-xl bg-white pt-0 overflow-auto h-full w-full">
            <div className="flex justify-between items-center pr-2 bg-white sticky top-0">
                <div>
                    {selectMode && selectedRows.length > 0 ? (
                        <div className="flex space-x-4">
                            <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleAction('delete')} />
                            <FaEnvelope className="text-blue-500 cursor-pointer" onClick={() => handleAction('email')} />
                            <FaCheck className="text-green-500 cursor-pointer" onClick={() => handleAction('approve')} />
                            <FaTimes className="text-red-500 cursor-pointer" onClick={() => handleAction('decline')} />
                        </div>
                    ) : (
                        <h1 className="text-xl font-thin text-gray-900 bg-white">Applications Pending</h1>
                    )}
                </div>
                <div className='bg-white sticky' style={{zIndex: 2000}}>
                    <FaEllipsisV className="text-gray-500 cursor-pointer" onClick={() => setShowKebabMenu(!showKebabMenu)} />
                    {showKebabMenu && (
                        <div className='sticky' style={{ position: 'absolute', opacity: 100, right: '0', marginTop: '0.5rem', width: '12rem', backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', padding: '0.25rem 0', zIndex: 2001 }}>
                            <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" onClick={handleSelectMode}>
                                Select
                            </p>
                            <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer">
                                This Month
                            </p>
                            <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer">
                                Show All
                            </p>
                        </div>
                    )}
                </div>
            </div>
    
            <div className="rounded-xl pt-6">
                <table className="w-full text-sm font-light text-left text-gray-900 dark:text-gray-400">
                    <thead className="text-xs rounded-lg text-gray-900 uppercase font-light bg-gray-300 w-full">
                        <tr className='sticky top-0 bg-gray-300 z-10'>
                            {selectMode && <th className="px-6 py-3"><input type="checkbox" /></th>}
                            {headings.map((headingName, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer ml-1"
                                    style={{ fontWeight: '300' }}
                                    onClick={() => handleSort(headingName.toLowerCase())}
                                >
                                    {headingName}
                                    {(headingName.toLowerCase() === 'date' || headingName.toLowerCase() === 'account') && <FaSort className="inline ml-1" />}
                                </th>
                            ))}
                            <th scope="col" className="px-6 py-3" style={{ fontWeight: '300' }}>
                                Hide
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ height: '2.2rem' }}></tr>
                        {sortedCollection.map(data => {
                            const listItem = data['data'];
                            const isHidden = hiddenApplicants.includes(data['id']);
                            return (
                                !isHidden && (
                                    <tr key={data['id']} className='border-b border-1 cursor-pointer' onClick={() => handleRowClick(data['id'])}>
                                        {selectMode && (
                                            <td className="px-6 py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(data['id'])}
                                                    onChange={() => handleRowSelect(data['id'])}
                                                />
                                            </td>
                                        )}
                                        {listItem.map((item, index) => (
                                            <td key={data['id']} className="px-6 py-3" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.length === 2 ? (
                                                    <div className='flex items-center'>
                                                        {index === 0 && <div className='bg-gray-400 rounded-full h-8 w-8 flex items-center justify-center mr-3 ml-0 pl-0'><FaUser className="text-white" /></div>}
                                                        <div className='ml-1 flex flex-col justify-between'>
                                                            <span className='py-1'>{item[0]}</span>
                                                            <span className='text-xs py-1'>{item[1]}</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    item
                                                )}
                                            </td>
                                        ))}
                                        <td className="px-6 py-3 cursor-pointer" onClick={() => toggleVisibility(data['id'])}>
                                            <FaEye />
                                        </td>
                                    </tr>
                                )
                            );
                        })}
                    </tbody>
                </table>
            </div>
    
            {action && (
                <div className="fixed inset-0 bg-gray-600 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Confirm {action}</h2>
                        {action !== 'delete' && (
                            <textarea className="w-full border rounded-lg p-2 mb-4" placeholder="Enter your message here..."></textarea>
                        )}
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => setAction(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={handleConfirmAction}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
    
}

export default DetailedListCard;
