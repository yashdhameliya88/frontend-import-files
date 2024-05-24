import { Route, Routes } from 'react-router-dom';
import './App.css';
import FileList from './Components/FileList';
import FileShow from './Components/FileShow';

function App() {
  return (
    <div>
      <h1 class="text-3xl font-bold underline flex justify-center mb-3">
        File Import
      </h1>
      <Routes>
        {/* <Route path='/' element={<PathSet />}/> */}
        {/* <Route path="/" element={<App />} /> */}
        <Route path='/' element={<FileList />}/>
        <Route path='/fileshow/:id' element={<FileShow />}/>
      </Routes>
    </div>
  );
}

export default App;
