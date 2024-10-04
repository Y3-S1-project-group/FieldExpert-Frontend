//App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing page routes
import Home from './pages/Home';
import PestDetection from './pages/PestDetection';
import Fertilizer from './pages/Fertilizer';
import CultivatedLandAreaChart from './pages/CultivatedLandAreaChart';




import CropRecommendation from './pages/CropRecommendation';
import DiseaseDetection from './pages/DiseaseDetection';

// Sales
import SalesAdd from './pages/Sales/SalesAdd';
import SalesAll from './pages/Sales/SalesAll';


// Importing components
import DiseaseDetectionComponent from './components/PlantDiseases/DiseaseDetectionComponent';

// import PotatoDetection from './components/PlantDiseases/PotatoDetection';
// import CassavaDetection from './components/PlantDiseases/CassavaDetection';
// import RiceDetection from './components/PlantDiseases/RiceDetection';
// import SugarcaneDetection from './components/PlantDiseases/SugarcaneDetection';
// import TomatoDetection from './components/PlantDiseases/TomatoDetection';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pestDetect' element={<PestDetection />} />
          <Route path='/fertilizer' element={<Fertilizer />} />
          <Route path='/cultivatedLandAreaChart' element={<CultivatedLandAreaChart />} />
          <Route path='/cropRecommend' element={<CropRecommendation />} />
          <Route path='/diseaseDetect' element={<DiseaseDetection />} />

          {/* Sales */}
          <Route path='/sales' element={<SalesAdd />} />
          <Route path='/allSale' element={<SalesAll />} />

          
          {/* <Route path='/potato' element={<PotatoDetection />} />
          <Route path='/cassava' element={<CassavaDetection />} />
          <Route path='/rice' element={<RiceDetection />} />
          <Route path='/sugarcane' element={<SugarcaneDetection />} />
          <Route path='/tomato' element={<TomatoDetection />} /> */}

          {/* Dynamic route for each crop's disease detection */}
          <Route path="/detect/:cropName" element={<DiseaseDetectionComponent />} />

        </Routes>

        

        
      </main>
    </Router>
  );
}

export default App;
