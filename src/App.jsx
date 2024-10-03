import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Importing page routes
import Home from './pages/Home';
import PestDetection from './pages/PestDetection';
import CropRecommendation from './pages/CropRecommendation';
import DiseaseDetection from './pages/DiseaseDetection';

// Sales
import SalesAdd from './pages/Sales/SalesAdd';
import SalesAll from './pages/Sales/SalesAll';


function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pestDetect' element={<PestDetection />} />
          <Route path='/cropRecommend' element={<CropRecommendation />} />
          <Route path='/diseaseDetect' element={<DiseaseDetection />} />

          {/* Sales */}
          <Route path='/sales' element={<SalesAdd />} />
          <Route path='/allSale' element={<SalesAll />} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;
