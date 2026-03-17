import InvitationsTable from "../components/invitations/InvitationsTable";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

export default function InvitationsPage() {
  return (
    <div className="min-h-screen bg-brand-page p-6">
      <Header />

      <h1 className="text-2xl font-bold text-white mb-6">Invitations Management</h1>

      <InvitationsTable />

      <Toaster position="top-right" />
    </div>
  );
}
