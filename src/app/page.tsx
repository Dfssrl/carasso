"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useHotkeys } from '@mantine/hooks';
import { useMantineColorScheme } from '@mantine/core';
import { useIdleTimer } from 'react-idle-timer'

import Login from './pages/login/login.tsx';
import Dashboard from './pages/dashboard/dashboard.tsx';


/**
 * Configurations
 */
var SESSION_LENGHT = 600000;



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
  const [date, setDate] = useState(new Date());
  const [count, setCount] = useState(0);
  const [sessionStatus, setSessionStatus] = useState("play"); // Session statuses: play, pause, stop
  const [callingStatus, setCallingStatus] = useState(false);

  const [idleState, setIdleState] = useState<string>('Active')
  const [idleCount, setIdleCount] = useState<number>(0)
  const [idleRemaining, setIdleRemaining] = useState<number>(0)

  const onIdle = () => {
    DisplayPauseState();
    setIdleState('Idle');
  }

  const onActive = () => {
    setIdleState('Active')
    console.warn("OK!")
  }

  const onAction = () => {
    setIdleCount(idleCount + 1)
  }

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: SESSION_LENGHT,
    throttle: 500
  })

  useHotkeys([
    ['mod + J', () => toggleColorScheme()],
  ]);
  useEffect(() => {
    // Check saved storage
    if (storage && storage.name == "auth" && storage.value) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [storage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdleRemaining(Math.ceil(getRemainingTime() / 1000))
    }, 500)

    return () => {
      clearInterval(interval)
    }
  })

  var timer, inactivityTimer;

  function DisplayPauseState() {
    setSessionStatus((sessionStatus == "play") ? "pause" : "play")
    if(sessionStatus == "play") { stopCount() } else { updateCount() }
  }
  function updateCount() {
    timer = setInterval(() => {
      // console.log('ticking', count)
      setCount(prevCount => prevCount + 1)
      setDate(new Date())
    }, 1000)
  }
  function stopCount() {
    // if (count === 3) {
      console.log('stop!');
      clearInterval(timer);
      // return () => clearInterval(timer)
    // }
    console.log("date", date);
  }

  useEffect(() => {
  }, []);

  useEffect(() => {
    updateCount();
    return () => clearInterval(timer)
  }, [count]);

  // Loading state
  if (loggedIn === null) {
    return <Loader color="blue" ml="50vw" mt="50vh" size={20} />;
  }

  if (!loggedIn) {
    return <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />;
  } else {
    return <Dashboard
      count={count}
      date={date}
      timer={timer}
      inactivityTimer={Math.ceil(getRemainingTime() / 1000)}
      idleRemaining={idleRemaining}
      updateCount={updateCount}
      stopCount={stopCount}
      // sessionLength={idleCount}
      sessionStatus={sessionStatus}
      setSessionStatus={setSessionStatus}
      callingStatus={sessionStatus}
      setCallingStatus={sessionStatus}
      />;
  }
}
