import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useUnreadMessageCount } from '@/hooks/useContactMessages';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  LogOut, 
  Loader2,
  Menu,
  X,
  MessageSquare,
  Mail,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isAdmin, isEditor, isInitializing, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingTooLong, setLoadingTooLong] = useState(false);
  const unreadCount = useUnreadMessageCount();

  useEffect(() => {
    if (!isInitializing) {
      setLoadingTooLong(false);
      return;
    }
    const timer = setTimeout(() => setLoadingTooLong(true), 6000);
    return () => clearTimeout(timer);
  }, [isInitializing]);

  useEffect(() => {
    if (!isInitializing && !user) {
      navigate('/admin/login');
    } else if (!isInitializing && user && !isAdmin && !isEditor) {
      navigate('/admin/login?error=unauthorized');
    }
  }, [user, isAdmin, isEditor, isInitializing, navigate]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        {loadingTooLong && (
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Taking longer than usual to connect...
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (!user || (!isAdmin && !isEditor)) {
    return null;
  }

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/messages', icon: MessageSquare, label: 'Messages', badge: unreadCount },
    { href: '/admin/subscribers', icon: Mail, label: 'Subscribers' },
    { href: '/admin/case-studies', icon: FileText, label: 'Case Studies' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/60 bg-card/95 backdrop-blur-md px-5 flex items-center justify-between">
        <Link to="/admin" className="font-bold text-lg tracking-tight">
          Astute CMS
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-full w-[272px] bg-card/95 backdrop-blur-md border-r border-border/60 transition-transform lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-16 border-b border-border/60 px-6 flex items-center">
          <Link to="/admin" className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Astute CMS
          </Link>
        </div>

        <nav className="p-5 space-y-1.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                location.pathname === item.href
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              )}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
              {'badge' in item && item.badge > 0 && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-semibold px-1.5">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-border/60">
          <div className="text-xs text-muted-foreground mb-3 truncate px-1">
            {user.email}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 rounded-xl"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:pl-[272px] pt-16 lg:pt-0 min-h-screen">
        <div className="p-5 sm:p-8 lg:p-10 max-w-[1400px]">{children}</div>
      </main>
    </div>
  );
}
