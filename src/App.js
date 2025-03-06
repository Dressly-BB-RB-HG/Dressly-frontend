import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Bejelentkezes from './pages/Bejelentkezes';
import Regisztracio from './pages/Regisztracio';
import Kezdolap from './pages/Kezdolap';
import Layout from './pages/Layout';
import Ruhazat from './pages/Ruhazat';
import Profil from './pages/Profil';
import Admin from './pages/Admin';
import { AuthProvider } from "./contexts/AuthContext";
import { KosarProvider } from "./contexts/KosarContext";
import Felhasznalok from './pages/AdminOldalak/Felhasznalok';
import Modell from './pages/AdminOldalak/Modell';
import Rendelesek from './pages/AdminOldalak/Rendelesek';
import FelhasznaloRendeles from './pages/FelhasznaloRendeles';
import RendelesOldal from './pages/RendelesOldal';


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <KosarProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Kezdolap />} />
              <Route path="Bejelentkezes" element={<Bejelentkezes />} />
              <Route path="regisztracio" element={<Regisztracio />} />
              <Route path="ruhazat" element={<Ruhazat />} />
              <Route path="profil" element={<Profil />} />
              <Route path="admin" element={<Admin />} />
              <Route path="felhasznalok" element={<Felhasznalok />} />
              <Route path="modell" element={<Modell />} />
              <Route path="rendelesek" element={<Rendelesek />} />
              <Route path="felhasznalorendelesek" element={<FelhasznaloRendeles />} />
              <Route path="rendelesoldal" element={<RendelesOldal />} />
            </Route>
          </Routes>
        </KosarProvider>
       </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
