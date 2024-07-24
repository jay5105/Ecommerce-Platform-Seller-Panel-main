// App.js
import './App.css';
import Login from './components/Login';
import { Routes, Route } from "react-router-dom";
import SellerPanel from './components/SellerPanel';
import RegisterPage from './components/RegisterPage ';
import Verification from './components/Verification';
import LandingPage from './components/LandingPage';
import AuthWrapper from './components/AuthWrapper';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Seller Register */}
        <Route path="/register" element={<RegisterPage />} />
        {/* Verify-OTP */}
        <Route path="/verify" element={<Verification />} />
        {/* Seller Login */}
        <Route path="/login" element={<Login />} />
        {/* Admin Panel */}
        <Route path="/seller/*" element={
           <AuthWrapper>
                <SellerPanel />
          </AuthWrapper>
          } />
      </Routes>
    </div>
  );
}

export default App;
