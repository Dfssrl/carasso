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
  const [date, setDate] = useState(new Date());
  const [count, setCount] = useState(0)
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

  let timer

  const updateCount = () => {
    timer = !timer && setInterval(() => {
      // console.log('ticking', count)
      setCount(prevCount => prevCount + 1)
      setDate(new Date())
    }, 1000)

    // if (count === 3) {
    //   console.log('stop!')
    //   clearInterval(timer)
    // }
    // console.log("date", date);
  }

  useEffect(() => {
    updateCount()
    return () => clearInterval(timer)
  }, [count]);

  // Loading state
  if (loggedIn === null) {
    return <Loader color="blue" ml="50vw" mt="50vh" size={20} />;
  }

  if (!loggedIn) {
    return <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />;
  } else {
    return <Dashboard count={count} date={date} />;
  }
}
