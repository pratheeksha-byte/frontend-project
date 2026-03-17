import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { resendInvite, revokeInvite } from "../../api/invitationsApi";
import { useInvitations } from "../../hooks/useInvitations";
import StatusBadge from "./StatusBadge";
import ConfirmDialog from "./ConfirmDialog";
import toast from "react-hot-toast";

export default function InvitationsTable() {
  const { data = [], refetch, isLoading } = useInvitations();

  const [sorting, setSorting] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const sortingIcons = {
    asc: " ↑",
    desc: " ↓",
  };

  const handleResend = async (id) => {
    setLoadingId(id);
    try {
      await resendInvite(id);
      toast.success("Invite resent successfully");
      refetch();
    } catch {
      toast.error("Failed to resend invite");
    } finally {
      setLoadingId(null);
    }
  };

  const handleRevokeConfirm = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleRevoke = async () => {
    if (!selectedId) return;

    setLoadingId(selectedId);
    try {
      await revokeInvite(selectedId);
      toast.success("Invite revoked");
      refetch();
    } catch {
      toast.error("Error revoking invite");
    } finally {
      setLoadingId(null);
      setConfirmOpen(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Invitee Name",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Role",
        accessorKey: "role",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <StatusBadge status={row.original.status} />
        ),
      },
      {
        header: "Date Sent",
        accessorKey: "dateSent",
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          const invite = row.original;

          if (invite.status !== "Pending") return null;

          return (
            <div className="flex gap-2">
              <button
                className="bg-brand-primary text-white px-3 py-1.5 rounded font-medium disabled:opacity-50 hover:brightness-110 transition"
                onClick={() => handleResend(invite.id)}
                disabled={loadingId === invite.id}
              >
                {loadingId === invite.id ? "Sending..." : "Resend"}
              </button>

              <button
                className="bg-red-600 text-white px-3 py-1.5 rounded font-medium disabled:opacity-50 hover:bg-red-500 transition"
                onClick={() => handleRevokeConfirm(invite.id)}
                disabled={loadingId === invite.id}
              >
                {loadingId === invite.id ? "Loading..." : "Revoke"}
              </button>
            </div>
          );
        },
      },
    ],
    [loadingId]
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="rounded-lg border border-brand-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-brand-modal">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-3 text-left text-brand-secondary font-medium cursor-pointer select-none text-sm"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {sortingIcons[header.column.getIsSorted()] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-brand-page">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 text-center text-brand-secondary"
                >
                  Loading...
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t border-brand-input">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3 text-gray-300">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-brand-secondary">
            Rows per page:
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) =>
              table.setPageSize(Number(e.target.value))
            }
            className="bg-brand-input border border-brand-border text-white rounded px-2 py-1 text-sm"
          >
            {[10, 15, 20, 25].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-brand-secondary">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <button
            className="border border-brand-border text-brand-secondary px-3 py-1 rounded text-sm disabled:opacity-50 hover:bg-brand-input transition"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>

          <button
            className="border border-brand-border text-brand-secondary px-3 py-1 rounded text-sm disabled:opacity-50 hover:bg-brand-input transition"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onConfirm={handleRevoke}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}