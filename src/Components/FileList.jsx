import React, { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useNavigate } from 'react-router-dom';

const FileList = () => {
    const [csvFiles, setCsvFiles] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
      fetchCsvData();
    }, []);
  
    const fetchCsvData = () => {
      fetch('http://localhost:3001/csv-data')
        .then(response => response.json())
        .then(data => {
          setCsvFiles(data);
        })
        .catch(error => console.error('Error fetching CSV data:', error));
    };
    // console.log('csvFiles', csvFiles)
    const handleOpen = (id) =>{
        navigate(`/fileshow/${id}`);
        console.log('path', `/fileshow/${id}`)
      }
  return (
      

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    File Index Number
                </th>
                <th scope="col" class="px-6 py-3">
                    File Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Show
                </th>
                <th scope="col" class="px-6 py-3">
                    Download
                </th>
            </tr>
        </thead>
        <tbody>
        {csvFiles.map((file, index) => (    
            <tr  key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                </th>
                <td class="px-6 py-4">
                {file.fileName}
                </td>
                <td class="px-6 py-4" onClick={()=>handleOpen(file.fileName)}>
                    <VisibilityIcon />
                </td>
                <td class="px-6 py-4">
                    <FileDownloadIcon />
                </td>
            </tr>
        ))}
        </tbody>
    </table>
</div>

  )
}

export default FileList
