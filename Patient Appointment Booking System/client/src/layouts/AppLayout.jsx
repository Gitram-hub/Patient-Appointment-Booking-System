import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar.jsx';
import { Navbar } from '../components/common/Navbar.jsx';
import { ChatWidget } from '../components/chatbot/ChatWidget.jsx';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(32,165,110,0.12),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_28%)] dark:bg-slate-950">
      <div className="mx-auto flex min-h-screen max-w-[1800px]">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
      <ChatWidget />
    </div>
  );
};