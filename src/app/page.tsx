"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useHotkeys } from '@mantine/hooks';
import { useMantineColorScheme } from '@mantine/core';

import Login from './pages/login/login.tsx';
import session from './hooks/timings/session.tsx';
import inactivity from './hooks/timings/inactivity.tsx';

import OperatorDashboard from './pages/dashboards/operator/operator_dashboard.tsx';
import OperatorMain from './pages/dashboards/operator/operator_main.tsx';
import OperatorManagerDashboard from './pages/dashboards/operator_manager/operator_manager_dashboard.tsx';
import OperatorManagerMain from './pages/dashboards/operator_manager/operator_manager_main.tsx';
import ConsultantDashboard from './pages/dashboards/consultant/consultant_dashboard.tsx';
import ConsultantMain from './pages/dashboards/consultant/consultant_main.tsx';
import ConsultantManagerDashboard from './pages/dashboards/consultant_manager/consultant_manager_dashboard.tsx';
import ConsultantManagerMain from './pages/dashboards/consultant_manager/consultant_manager_main.tsx';
import SellerDashboard from './pages/dashboards/seller/seller_dashboard.tsx';
import SellerMain from './pages/dashboards/seller/seller_main.tsx';
import SellerManagerDashboard from './pages/dashboards/seller_manager/seller_manager_dashboard.tsx';
import SellerManagerMain from './pages/dashboards/seller_manager/seller_manager_main.tsx';
import AdminDashboard from './pages/dashboards/admin/admin_dashboard.tsx';
import AdminMain from './pages/dashboards/admin/admin_main.tsx';



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
    if(storage.type == "operator") {
      if(dashboard) {
        return <OperatorDashboard
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
        return <OperatorMain
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
    } else if(storage.type == "operator_manager") {
      if(dashboard) {
        return <OperatorManagerDashboard
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
        return <OperatorManagerMain
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
    } else if(storage.type == "consultant") {
      if(dashboard) {
        return <ConsultantDashboard
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
        return <ConsultantMain
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
    } else if(storage.type == "consultant_manager") {
      if(dashboard) {
        return <ConsultantManagerDashboard
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
        return <ConsultantManagerMain
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
    } else if(storage.type == "seller") {
      if(dashboard) {
        return <SellerDashboard
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
        return <SellerMain
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
    } else if(storage.type == "seller_manager") {
      if(dashboard) {
        return <SellerManagerDashboard
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
        return <SellerManagerMain
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
    } else if(storage.type == "admin") {
      if(dashboard) {
        return <AdminDashboard
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
        return <AdminMain
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
}
