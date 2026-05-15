import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <Container className="flex flex-col gap-4 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© 2026 AquaDynasty. Premium guppy marketplace.</p>
        <p>Built with React, Vite, Express, MongoDB, and a lot of aquarium ambition.</p>
      </Container>
    </footer>
  );
}