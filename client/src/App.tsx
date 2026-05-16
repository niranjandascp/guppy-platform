import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRouter from "./routes/AppRouter";
import { useRestoreSession } from "./features/auth/useRestoreSession";

function AppContent() {
  useRestoreSession();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;