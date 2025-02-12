import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import DefaultLayout from './layout/DefaultLayout';
import NID from './pages/NID';
import DARS from './pages/DARS';
import MOR from './pages/MOR';
import MOTRI from './pages/MOTRI';
import MOLS from './pages/MOLS';
import MFA from './pages/MFA';
import EAES from './pages/EAES';
import Immigration from './pages/Immigration';
import Mesob from './pages/Mesob';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route path="/nid" element={<NID />} />
        <Route path="/dars" element={<DARS />} />
        <Route path="/mor" element={<MOR />} />
        <Route path="/motri" element={<MOTRI />} />
        <Route path="/mols" element={<MOLS />} />
        <Route path="/mfa" element={<MFA />} />
        <Route path="/eaes" element={<EAES />} />
        <Route path="/immigration" element={<Immigration />} />
        <Route path="/mesob" element={<Mesob />} />  
      </Routes>
    </DefaultLayout>
  );
}

export default App;
