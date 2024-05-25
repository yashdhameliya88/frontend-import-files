import React, { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useNavigate } from 'react-router-dom';

const FileList = () => {
    const [csvFiles, setCsvFiles] = useState([]);
    const [csvPathSet, setCsvPathSet] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCsvData();
    }, []);

    const fetchCsvData = () => {
        setIsLoading(true); // Set loading to true when fetching data
        fetch('http://localhost:3001/csv-data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch CSV data');
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error('Received data is not an array');
                }
                setCsvFiles(data);
                setCsvPathSet(true);
            })
            .catch(error => {
                console.error('Error fetching CSV data:', error);
                setCsvPathSet(false);
            })
            .finally(() => {
                setIsLoading(false); // Set loading to false regardless of success or failure
            });
    };

    const handleOpen = (id) => {
        navigate(`/fileshow/${id}`);
    };  

    return (
        <div className="relative overflow-x-auto">
            {isLoading ? ( // Check if loading is true
                <div className="flex items-center justify-center mt-20 loading-spinner-container">
                    <img
                      src="https://loading.io/assets/mod/spinner/spinner/lg.gif"
                      alt="Loading..."
                      className="loading-spinner"
                    />
                </div>
            ) : (
                csvPathSet ? (
                    csvFiles.length > 0 ? (
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            {/* Table Headers */}
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        File Index Number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        File Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Show
                                    </th>
                                </tr>
                            </thead>
                            {/* Table Body */}
                            <tbody>
                                {csvFiles.map((file, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {file.fileName}
                                        </td>
                                        <td className="px-6 py-4 cursor-pointer" onClick={() => handleOpen(file.fileName)}>
                                            <VisibilityIcon />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <section className="text-gray-600 body-font relative">
                            <div className="container px-5 py-24 mx-auto">
                                <div className="flex flex-col text-center w-full mb-12">
                                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Don't have any data</h1>
                                </div>
                            </div>
                        </section>
                    )
                ) : (
                    <section className="text-gray-600 body-font relative">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-col text-center w-full mb-12">
                                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Your CSV directory path is not set.</h1>
                            </div>
                            <div className='flex justify-center'>
                                <div className='flex gap-5'>
                                    <div>
                                        <button 
                                            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                            type="submit"
                                            onClick={() => navigate('/pathset')}
                                        >
                                            Set Path
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            )}
        </div>
    );
};

export default FileList;
