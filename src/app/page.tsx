"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useHotkeys } from '@mantine/hooks';
import { useMantineColorScheme } from '@mantine/core';

import Login from './pages/login/login.tsx';
import Dashboard from './pages/operators/dashboard/dashboard.tsx';
import Operative from './pages/operators/dashboard/operative.tsx';
import session from './hooks/timings/session.tsx';
import inactivity from './hooks/timings/inactivity.tsx';


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

  const [sessionStatus, setSessionStatus] = useState("play"); // Session statuses: play, pause, stop
  const [sessionMaxStatus, setSessionMaxStatus] = useState("play"); // Session statuses: play, pause, stop
  const [callingStatus, setCallingStatus] = useState(false);
  const [dashboard, setDashboard] = useState(true);

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

  const inactivity_data = inactivity(sessionStatus, setSessionStatus);
  const date = inactivity_data.date;
  const timer = inactivity_data.timer;
  const idleRemaining = inactivity_data.idleRemaining;
  const remainingTime = inactivity_data.remainingTime;
  const updateCount = inactivity_data.updateCount;
  const stopCount = inactivity_data.stopCount;

  const session_data = session(sessionStatus, setSessionStatus, setDashboard);
  // // const date = session_data.date;
  // // const timer = session_data.timer;
  const session_idleRemaining = session_data.idleRemaining;
  const session_remainingTime = session_data.remainingTime;
  const session_updateCount = session_data.updateCount;
  const session_stopCount = session_data.stopCount;

  // console.log("inactivity_data.sessionStatus", inactivity_data.sessionStatus);
  // console.log("session_data.sessionStatus", session_data.sessionStatus);

  useEffect(() => {
    setSessionStatus(inactivity_data.sessionStatus);
    setSessionMaxStatus(session_data.idleRemaining);
  }, [timer]);


  // Loading state
  if (loggedIn === null) {
    return <Loader color="blue" ml="50vw" mt="50vh" size={20} />;
  }

  if (!loggedIn) {
    return <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />;
  } else {
    if(dashboard) {
      return <Dashboard
        setDashboard={setDashboard}
        // count={count}
        date={date}
        timer={timer}
        inactivityTimer={remainingTime}
        idleRemaining={idleRemaining}
        updateCount={updateCount}
        stopCount={stopCount}
        // // sessionLength={idleCount}
        sessionStatus={sessionStatus}
        setSessionStatus={setSessionStatus}
        sessionMaxStatus={sessionMaxStatus}
        setSessionMaxStatus={setSessionMaxStatus}
        callingStatus={callingStatus}
        setCallingStatus={setCallingStatus}
      />;
    } else {
      return <Operative
        setDashboard={setDashboard}
        // count={count}
        date={date}
        timer={timer}
        inactivityTimer={remainingTime}
        idleRemaining={idleRemaining}
        updateCount={updateCount}
        stopCount={stopCount}
        // // sessionLength={idleCount}
        sessionStatus={sessionStatus}
        setSessionStatus={setSessionStatus}
        sessionMaxStatus={sessionMaxStatus}
        setSessionMaxStatus={setSessionMaxStatus}
        callingStatus={callingStatus}
        setCallingStatus={setCallingStatus}
      />;
    }
  }
}
