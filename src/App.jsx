import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Importing page routes
import Home from './pages/Home';
import PestDetection from './pages/PestDetection';
import CropRecommendation from './pages/CropRecommendation';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pestDetect' element={<PestDetection />} />
          <Route path='/cropRecommend' element={<CropRecommendation />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
