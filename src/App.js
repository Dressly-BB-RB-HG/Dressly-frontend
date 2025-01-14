import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Bejelentkezes from './pages/Bejelentkezes';
import Regisztracio from './pages/Regisztracio';
import Kezdolap from './pages/Kezdolap';
import Layout from './pages/Layout';
import Ruhazat from './pages/Ruhazat';

function App() {
  return (
    <BrowserRouter>
    <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Kezdolap />} />
                <Route path="Bejelentkezes" element={<Bejelentkezes />} />
                <Route path="regisztracio" element={<Regisztracio />} />
                <Route path="ruhazat" element={<Ruhazat/>}/>
            </Route>
        </Routes>    
    </BrowserRouter>
  );
}

export default App;
