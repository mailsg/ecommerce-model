import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route>404 Not Found!</Route>
      </Routes>
    </>
  );
}

export default App;
