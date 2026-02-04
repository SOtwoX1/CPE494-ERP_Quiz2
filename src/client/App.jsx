import { BrowserRouter, Routes, Route } from "react-router-dom";
import LuxuryRevenueDashboard from './components/LuxuryRevenueDashboard';
import LuxurySalesPerformance from './components/LuxurySalesPerformance';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LuxuryRevenueDashboard />} />
        <Route path="/sales" element={<LuxurySalesPerformance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

