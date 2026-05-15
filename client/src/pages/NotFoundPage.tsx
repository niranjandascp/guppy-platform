import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="py-24">
      <Container className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-slate-400">The page you requested does not exist.</p>
        <Link to="/" className="mt-8 inline-block">
          <Button>Go Home</Button>
        </Link>
      </Container>
    </div>
  );
}