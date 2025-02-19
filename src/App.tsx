import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import "@fortawesome/fontawesome-free/css/all.min.css";

import './styles/app.module.css'

import Navbar from './components/organisms/Navbar';

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from './pages/NotFound';
import LayoutLandingPage from './pages/LandingPage';

import Footer from './components/organisms/Footer';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/layout" element={<LayoutLandingPage />} />
        <Route path="*" element={<NotFound />} /> {/* Rota para páginas não encontradas */}
      </Routes>
      <Footer />
    </>
  )
}

export default App
