import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-400/30">
        <Navbar />
        <main className="relative">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </BrowserRouter>

  );
}

export default App;