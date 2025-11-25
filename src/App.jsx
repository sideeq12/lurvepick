import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { EyeTrackingProvider } from './context/EyeTrackingContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import EyeCursor from './components/EyeCursor';
import CalibrationOverlay from './components/CalibrationOverlay';
import { useEyeTracking } from './context/EyeTrackingContext';

const AppContent = () => {
  const { showCalibration } = useEyeTracking();

  return (
    <>
      <Router>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Layout>
        </CartProvider>
      </Router>
      <EyeCursor />
      {showCalibration && <CalibrationOverlay />}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <EyeTrackingProvider>
        <AppContent />
      </EyeTrackingProvider>
    </ThemeProvider>
  );
}

export default App;
