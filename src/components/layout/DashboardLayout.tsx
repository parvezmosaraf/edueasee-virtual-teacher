import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { Edit, CheckCircle, Calculator, BookOpen, MessageSquare, FileText, Home, LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const { logout, tempAuthEnabled } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    navigate('/');
    setIsLoggingOut(false);
  };

  const sidebarItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Edit size={20} />, label: 'Article Rewrite', path: '/tools/rewrite' },
    { icon: <MessageSquare size={20} />, label: 'Paraphrasing', path: '/tools/paraphrase' },
    { icon: <CheckCircle size={20} />, label: 'Grammar Fix', path: '/tools/grammar' },
    { icon: <FileText size={20} />, label: 'Document Analysis', path: '/tools/document' },
    { icon: <Calculator size={20} />, label: 'Equation Solver', path: '/tools/equations' },
    { icon: <BookOpen size={20} />, label: 'Assignment Helper', path: '/tools/assignment' },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border/50 hidden md:block">
        <div className="h-full flex flex-col">
          <div className="p-6">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/logo.png" 
                alt="Edueasee Logo" 
                className="h-8 w-auto"
              />
              <span className="font-display text-xl font-bold text-primary">
                Edueasee
              </span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-border/50">
            {tempAuthEnabled && (
              <div className="px-3 py-2 mb-3 text-xs rounded bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                Demo Mode Active
              </div>
            )}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            >
              <LogOut size={20} />
              <span>{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border/50 flex items-center px-6">
          <h1 className="text-xl font-semibold">{title}</h1>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;