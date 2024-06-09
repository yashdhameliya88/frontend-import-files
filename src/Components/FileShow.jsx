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
  console.log('csvFile.data', csvFile)
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
          console.log('dataaaaa', data)
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

  
  console.log('csvFile.data', csvFile.data)
  // const num1 =parseFloat(csvFile.data.find((ele)=>ele["Dia."] == "1.33")["R. P. Ct."])
  // const num2 =parseFloat(csvFile.data.find((ele)=>ele["Dia."] == "1.32")["R. P. Ct."])
  // const total = num1 + num2;
  // console.log('total', total)
  // // console.log('csvFiledata', csvFile.data.find((ele)=>ele.Clarity).Clarity)
  // console.log('csvFiledata', csvFile.data.find((ele)=>ele["No."])["R. P. Ct."])
  return (
    <div className="w-full">
      <div className="flex justify-between mt-3">
      <h1 className="text-2xl font-bold mb-4">CSV Details</h1>
      </div>
      <div className="table-container" style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-blue-200 font-bold">
              <th>No.</th>
              <th>R. Ct.</th>
              <th>T. Po. Ct.</th>
              <th>T. Po. %</th>
              <th>R. P. Ct.</th>
              <th>P. Po. Ct.</th>
              <th>Dia.</th>
              <th>Shape</th>
              <th>Co.</th>
              <th>Clarity</th>
            </tr>
          </thead>
          <tbody>
            {csvFile.data.map((data, index) => (
              <tr style={{ height: '25px', backgroundColor: 'white' }} key={index}>
                <td className="border">{data["No."]}</td>
                <td className="border">{data["R. Ct."]}</td>
                <td className="border">{data["T. Po. Ct."]}</td>
                <td className="border">{data["T. Po. %"]}</td>
                <td className="border">{data["R. P. Ct."]}</td>
                <td className="border">{data["P. Po. Ct."]}</td>
                <td className="border">{data["Dia."]}</td>
                <td className="border">{data["Shape"]}</td>
                <td className="border">{data["Co."]}</td>
                <td className="border">{data["Clarity"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileShow;
