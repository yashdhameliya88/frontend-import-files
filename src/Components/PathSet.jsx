import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PathSet = ({ setTxtDirectory }) => {
  const [directory, setDirectory] = useState('');
  const [csvDirectory, setCsvDirectory] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading
  const [serverConnected, setServerConnected] = useState(true); // State to track server connection
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDirectory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await axios.post('http://localhost:3001/set-directory', { directory });
      setTxtDirectory(directory);
      navigate('/');
    } catch (error) {
      console.error('Error setting directory:', error);
      setServerConnected(false); // Set server connection status to false
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    // Fetch CSV directory from backend
    const fetchCsvDirectory = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get('http://localhost:3001/get-directory');
        setCsvDirectory(response.data.csvDirectory);
        setServerConnected(true); // Set server connection status to true
      } catch (error) {
        console.error('Error fetching CSV directory:', error);
        setServerConnected(false); // Set server connection status to false
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchCsvDirectory();

    // Fetch server connection status from backend
    const fetchServerStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3001/server-active');
        const { serverActive } = response.data;
        setServerConnected(serverActive);
      } catch (error) {
        console.error('Error fetching server status:', error);
        setServerConnected(false); // Set server connection status to false on error
      }
    };
    fetchServerStatus();
  }, []);

  return (
    <>
      {!loading && serverConnected ? (
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Set Your Path</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='flex justify-center'>
                <div className='flex gap-5'>
                  <div>
                    <input
                      type="text" 
                      className="bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors ease-in-out"
                      placeholder='Enter Your Path'
                      value={directory} 
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <button 
                      className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                      type="submit"
                    >
                      Set Path
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {csvDirectory ? (
              <p className="text-gray-600 text-center mt-4">Current CSV Directory: {csvDirectory}</p>
            ) : (
              <p className="text-gray-600 text-center mt-4">Your CSV directory path is not set.</p>
            )}
          </div>
        </section>
      ) : (
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Server is not connected. Please check your Server connection.</h1>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PathSet;
