import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import FileList from './Components/FileList';
import FileShow from './Components/FileShow';
import Header from './Components/Header';
import PathSet from './Components/PathSet';

function App() {
  const [txtDirectory, setTxtDirectory] = useState('');
  console.log('txtDirectory', txtDirectory)
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<FileList />}/>
        <Route path='/fileshow/:id' element={<FileShow />}/>
        <Route path='/pathset' element={<PathSet setTxtDirectory={setTxtDirectory}/>}/>
      </Routes>
    </div>
  );
}

export default App;
