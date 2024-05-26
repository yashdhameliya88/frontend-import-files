import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FileShow = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const [serverConnected, setServerConnected] = useState(true); // State to track server connection
  const { id } = useParams();

  useEffect(() => {
    fetchServerStatus(); // Fetch server connection status on component mount
    fetchCsvData();
  }, [id]);

  const fetchServerStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/server-active');
      const { serverActive } = await response.json();
      setServerConnected(serverActive);
    } catch (error) {
      console.error('Error fetching server status:', error);
      setServerConnected(false); // Set server connection status to false on error
    }
  };

  const fetchCsvData = () => {
    setLoading(true); // Start loading
    // Fetch CSV data only if server is connected
    if (serverConnected) {
      fetch(`http://localhost:3001/csv-data/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Server response not OK');
          }
          return response.json();
        })
        .then(data => {
          setCsvFile(data);
        })
        .catch(error => {
          console.error('Error fetching CSV data:', error);
          setCsvFile(null); // Set csvFile to null on error
        })
        .finally(() => setLoading(false)); // Stop loading
    }
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

  if (!loading && !csvFile && !serverConnected) {
    return (
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Server is not connected. Please check your Server connection.</h1>
          </div>
        </div>
      </section>
    );
  }

  if (loading || !csvFile) {
    return (
      <div className="flex items-center justify-center mt-20 loading-spinner-container">
        <img
          src="https://loading.io/assets/mod/spinner/spinner/lg.gif"
          alt="Loading..."
          className="loading-spinner"
        />
      </div>
    );
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
        {/* <div className="mt-4">
          <button onClick={() => handleDownload(csvFile.fileName)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Download PDF
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default FileShow;
