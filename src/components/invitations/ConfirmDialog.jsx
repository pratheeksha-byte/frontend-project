export default function ConfirmDialog({ open, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="bg-brand-modal border border-brand-border p-6 rounded-lg shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-4">
          Are you sure you want to revoke this invite?
        </h2>

        <div className="flex gap-3">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-500 transition"
            onClick={onConfirm}
          >
            Yes, Revoke
          </button>

          <button
            className="bg-brand-input border border-brand-border text-brand-secondary px-4 py-2 rounded font-medium hover:bg-brand-page transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
