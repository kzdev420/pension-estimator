import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Resources } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Resources />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
