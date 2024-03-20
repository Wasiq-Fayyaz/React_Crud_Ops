import './App.css';
import AddData from './components/adddata/adddata';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewData from './components/viewdata/viewdata';
function App() {
  return (
        <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<AddData/>}></Route>
          <Route exact path='/viewdata.jsx' element={<ViewData/>}></Route>
        </Routes>
        </BrowserRouter>
    
  );
}

export default App;
