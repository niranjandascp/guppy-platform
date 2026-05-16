import { Outlet } from "react-router-dom";
import Container from "../../components/layout/Container";
import AdminSidebar from "../../components/layout/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="bg-slate-950 py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <AdminSidebar />
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
}