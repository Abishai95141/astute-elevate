import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, isAdmin, isEditor, isLoading, isSigningIn, error, signIn } = useAdminAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [localError, setLocalError] = useState<string | null>(null);

  // Check for unauthorized error in URL
  useEffect(() => {
    if (searchParams.get('error') === 'unauthorized') {
      setLocalError('You do not have permission to access the admin area.');
    }
  }, [searchParams]);

  // Redirect if already logged in as admin/editor
  useEffect(() => {
    if (user && (isAdmin || isEditor)) {
      navigate('/admin');
    }
  }, [user, isAdmin, isEditor, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Please enter email and password');
      return;
    }

    const result = await signIn(email, password);
    
    // Navigate on success - don't wait for effect
    if (!result.error) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Astute CMS</CardTitle>
          <CardDescription>
            Sign in to manage content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {(error || localError) && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error || localError}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                disabled={isSigningIn}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isSigningIn}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSigningIn}>
              {isSigningIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Only authorized admins and editors can access this area.
              Contact an administrator if you need access.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
