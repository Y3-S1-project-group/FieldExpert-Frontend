import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Importing page routes
import Home from './pages/Home';
import ImageUpload from './pages/ImageUpload';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pestDetect' element={<ImageUpload />} />
          <Route path='/diseaseDetect' element={<ImageUpload />} />
          <Route path='/farmManagement' element={<ImageUpload />} />
          <Route path='/fertilizer' element={<ImageUpload />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
