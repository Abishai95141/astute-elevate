import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AppRole = 'admin' | 'editor' | 'user';

interface AdminAuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isEditor: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    session: null,
    isAdmin: false,
    isEditor: false,
    isLoading: true,
    error: null,
  });

  const checkUserRole = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) throw error;

      const roles = data?.map((r) => r.role as AppRole) || [];
      return {
        isAdmin: roles.includes('admin'),
        isEditor: roles.includes('editor') || roles.includes('admin'),
      };
    } catch {
      return { isAdmin: false, isEditor: false };
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const roles = await checkUserRole(session.user.id);
          setState({
            user: session.user,
            session,
            isAdmin: roles.isAdmin,
            isEditor: roles.isEditor,
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            user: null,
            session: null,
            isAdmin: false,
            isEditor: false,
            isLoading: false,
            error: null,
          });
        }
      }
    );

    // Then get the initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const roles = await checkUserRole(session.user.id);
        setState({
          user: session.user,
          session,
          isAdmin: roles.isAdmin,
          isEditor: roles.isEditor,
          isLoading: false,
          error: null,
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, [checkUserRole]);

  const signIn = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setState(prev => ({ ...prev, isLoading: false, error: error.message }));
      return { error };
    }

    return { data };
  };

  const signUp = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setState(prev => ({ ...prev, isLoading: false, error: error.message }));
      return { error };
    }

    setState(prev => ({ ...prev, isLoading: false }));
    return { data };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setState({
      user: null,
      session: null,
      isAdmin: false,
      isEditor: false,
      isLoading: false,
      error: null,
    });
  };

  return {
    ...state,
    signIn,
    signUp,
    signOut,
  };
}
