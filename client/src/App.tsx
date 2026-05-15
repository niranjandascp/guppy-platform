import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRouter from "./routes/AppRouter";
import UnderwaterBackground from "./components/ui/UnderwaterBackground";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-white selection:bg-cyan-400/30">
        <UnderwaterBackground />
        <Navbar />
        <main className="relative z-10">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;