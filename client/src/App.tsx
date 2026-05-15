import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.tsx';

// Dummy components for testing routing
const Home = () => <div className="pt-32 text-center text-3xl font-light">Premium Guppy Showcase <br/><span className="text-aqua text-5xl font-bold mt-4 block">Coming Soon</span></div>;
const Shop = () => <div className="pt-32 text-center text-3xl">Shop Page</div>;
const Login = () => <div className="pt-32 text-center text-3xl">Login Page</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-ocean flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;