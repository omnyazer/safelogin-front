function initialsFromUsername(username) {
  if (!username) {
    return 'IN';
  }

  return username
    .split(' ')
    .map((chunk) => chunk[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function AvatarBadge({ username }) {
  const initials = initialsFromUsername(username);

  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 text-sm font-bold text-white shadow-md">
      {initials}
      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-400 dark:border-slate-900" />
    </div>
  );
}
