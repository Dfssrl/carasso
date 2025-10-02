"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useHotkeys } from '@mantine/hooks';
import { useMantineColorScheme } from '@mantine/core';

import Login from './pages/login/login.tsx';
import Dashboard from './pages/dashboard/dashboard.tsx';

export default function Home() {
  const router = useRouter();
  const { toggleColorScheme } = useMantineColorScheme();
  const [loggedIn, setLoggedIn] = useState(null);
  const [storage, setStorage] = useLocalStorage({
    key: 'auth',
    value: loggedIn,
    date: new Date(),
    httpOnly: true,
    path: '/',
  });
  // const storage = JSON.parse(localStorage.getItem("auth"));
  useHotkeys([
    ['mod + J', () => toggleColorScheme()],
    ['mod + shift + alt + X', () => secret()],
  ]);

  useEffect(() => {
    // Check saved storage
    if (storage && storage.name == "auth" && storage.value) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [storage]);


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
