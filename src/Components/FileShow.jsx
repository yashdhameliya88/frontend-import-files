import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FileShow = () => {
  const [csvFile, setCsvFile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchCsvData();
  }, [id]);

  const fetchCsvData = () => {
    fetch('http://localhost:3001/csv-data')
      .then(response => response.json())
      .then(data => {
        // Find the file matching the ID
        const matchingFile = data.find(file => file.fileName === id);
        setCsvFile(matchingFile);
      })
      .catch(error => console.error('Error fetching CSV data:', error));
  };

  const renderTableHeaders = (headers) => {
    return (
      <thead className="bg-gray-200">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="border border-gray-400 px-4 py-2">{header}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderTableRows = (data) => {
    return (
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((value, colIndex) => (
              <td key={colIndex} className="border border-gray-400 px-4 py-2">{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  const handleDownload = (fileName) => {
    // Implement download logic here
    console.log('Download CSV:', fileName);
  };

  if (!csvFile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">{csvFile.fileName}</h1>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-400">
            {renderTableHeaders(Object.keys(csvFile.data[0]))}
            {renderTableRows(csvFile.data)}
          </table>
        </div>
        <div className="mt-4">
          <button onClick={() => handleDownload(csvFile.fileName)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileShow;
