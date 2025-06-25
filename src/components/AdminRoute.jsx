import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AdminRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setChecking(false);
    });
  }, []);

  if (checking) return null;

  return session ? children : <Navigate to="/admin-login" />;
};

export default AdminRoute;
