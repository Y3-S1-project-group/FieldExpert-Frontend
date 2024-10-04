import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing page routes
import Home from './pages/Home';
import PestDetection from './pages/PestDetection';
import Fertilizer from './pages/Fertilizer';
import CultivatedLandAreaChart from './pages/CultivatedLandAreaChart';





function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pestDetect' element={<PestDetection />} />
          <Route path='/fertilizer' element={<Fertilizer />} />
          <Route path='/cultivatedLandAreaChart' element={<CultivatedLandAreaChart />} />
        </Routes>

        

        
      </main>
    </Router>
  );
}

export default App;
