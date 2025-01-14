import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Bejelentkezes from './pages/Bejelentkezes';
import Kezdolap from './pages/Kezdolap';
import Layout from './pages/Layout';

function App() {
  return (
    <BrowserRouter>
    <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Kezdolap />} />
                <Route path="Bejelentkezes" element={<Bejelentkezes />} />
            </Route>
        </Routes>    
    </BrowserRouter>
  );
}

export default App;
