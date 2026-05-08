export default function Loader({ label = 'Chargement...' }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      {label}
    </span>
  );
}
