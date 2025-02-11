// TableWithActions.jsx
import { useState } from "react";
import { Search, Filter, Edit2, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { Pagination } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const TableWithActions = ({ title, tableHeader, tableData }) => {
  const [filterText, setFilterText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(tableData);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [expandedRows, setExpandedRows] = useState(new Set());
  const rowsPerPage = 10;

  // Process and filter data
  const processedData = data
    .filter((row) =>
      row.some((cell) =>
        cell.toString().toLowerCase().includes(filterText.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const columnIndex = tableHeader.indexOf(sortConfig.key);
      const aValue = a[columnIndex];
      const bValue = b[columnIndex];
      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = processedData.slice(startIndex, startIndex + rowsPerPage);

  // Row expansion toggle
  const toggleRowExpand = (rowIndex) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowIndex)) {
        newSet.delete(rowIndex);
      } else {
        newSet.add(rowIndex);
      }
      return newSet;
    });
  };

  // Handlers
  const handleSort = (header) => {
    setSortConfig((prevConfig) => ({
      key: header,
      direction: prevConfig.key === header && prevConfig.direction === "ascending"
        ? "descending"
        : "ascending",
    }));
  };

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  const handleDelete = () => {
    setData((prevData) => prevData.filter((_, index) => index !== rowToDelete));
    setDeleteModalOpen(false);
    setRowToDelete(null);
  };

  const confirmDelete = (rowIndex) => {
    setRowToDelete(rowIndex);
    setDeleteModalOpen(true);
  };

  const handleEdit = (rowIndex) => {
    setEditRowIndex(rowIndex);
    setEditRowData(data[rowIndex]);
    setModalOpen(true);
  };

  const handleEditSave = () => {
    setData(prev => {
      const newData = [...prev];
      newData[editRowIndex] = editRowData;
      return newData;
    });
    setModalOpen(false);
  };

  return (
    <div className="p-6 rounded-lg w-full mx-auto bg-gray-900">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {title}
        </h2>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table/Cards List */}
      <div className="space-y-4">
        {paginatedData.length > 0 ? (
          paginatedData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-750 border border-gray-700"
            >
              {/* Main Row Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleRowExpand(rowIndex)}
                      className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
                    >
                      {expandedRows.has(rowIndex) ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </button>
                    <span className="text-lg font-medium text-white">ID: {row[0]}</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className={`px-4 py-1 rounded-full text-sm font-medium ${
                      row[row.length - 1] === 'Active' 
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-gray-600/40 text-gray-300'
                    }`}>
                      {row[row.length - 1]}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(rowIndex)}
                        className="p-2 rounded-full hover:bg-gray-700 text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => confirmDelete(rowIndex)}
                        className="p-2 rounded-full hover:bg-gray-700 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">User Name</div>
                    <div className="text-white font-medium">{row[1]}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="text-white">{row[2]}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">Phone Number</div>
                    <div className="text-white">{row[3]}</div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedRows.has(rowIndex) && (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-400">Last Trade</div>
                        <div className="text-white">{row[4]}</div>
                      </div>
                      {/* Add additional fields here as needed */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-12 bg-gray-800 rounded-lg">
            No data available
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          count={Math.ceil(processedData.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          className="text-white"
        />
      </div>

      {/* Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="edit-row-modal"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Edit Record</h3>
          <div className="space-y-4">
            {tableHeader.map((header, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {header}
                </label>
                <input
                  type="text"
                  value={editRowData[index] || ''}
                  onChange={(e) => {
                    const newData = [...editRowData];
                    newData[index] = e.target.value;
                    setEditRowData(newData);
                  }}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEditSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="delete-confirmation-modal"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-gray-800 rounded-lg shadow-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Confirm Delete</h3>
          <p className="text-gray-300 mb-6">
            Are you sure you want to delete this record? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TableWithActions;