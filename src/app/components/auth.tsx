// components/auth.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Auth(WrappedComponent) {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      // Verifica se l'utente è autenticato
      const isAuth = localStorage.getItem('auth');
      if (!isAuth) {
        router.replace('/login');
      }
    }, []);

    // Potresti voler mostrare un loading o nulla finché si verifica la verifica
    const isAuthenticated = !!localStorage.getItem('auth');

    if (!isAuthenticated) {
      return null; // o un componente di loading
    }

    return <WrappedComponent {...props} />;
  };
}
