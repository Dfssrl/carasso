"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import Login from './pages/login/login.tsx';
import Dashboard from './pages/dashboard/dashboard.tsx';

export default function Home() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(null);
  const [storage, setStorage] = useLocalStorage({
    key: 'auth',
    value: false,
    httpOnly: true,
    path: '/',
  });

  useEffect(() => {
    // Gets cookies
    // const cookies = document.cookie;
    console.log(storage);

    if (storage) {
      setStorage({
        name: 'auth',
        value: true,
        httpOnly: true,
        path: '/',
      })
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  // Loading state
  if (loggedIn === null) {
    return <Loader color="blue" ml="50vw" mt="50vh" size={20} />;
  }

  if (!loggedIn) {
    return <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />;
  } else {
    return <Dashboard />;
  }
}
