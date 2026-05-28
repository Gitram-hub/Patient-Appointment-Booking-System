import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 px-4 text-center text-white">
      <div>
        <p className="text-xs uppercase tracking-[0.5em] text-clinic-300">404</p>
        <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
        <p className="mt-3 text-slate-300">The page you requested does not exist.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-clinic-600 px-6 py-3 font-semibold text-white shadow-soft">
          Return home
        </Link>
      </div>
    </div>
  );
}