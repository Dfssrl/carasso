import { useState, useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer'

/**
 * Configurations
 */
var FAST_SESSION = 10000;
var SESSION = 1800000;

/* --- */
var timer, inactivityTimer;

export default function session(sessionStatus, setSessionStatus, setDashboard) {
  const [date, setDate] = useState(new Date());
  const [count, setCount] = useState(0);
  const [idleState, setIdleState] = useState<string>('Active')
  const [idleCount, setIdleCount] = useState<number>(0)
  const [idleRemaining, setIdleRemaining] = useState<number>(0)

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
  const { getRemainingTime } = useIdleTimer({
    onIdle: () => {
      console.log(sessionStatus);
      setSessionStatus("stop");
      setDashboard(true);
      setIdleState('Idle');
    },
    onActive: () => {
      setIdleState('Active')
      console.warn("OK!")
    },
    onAction: () => {
      setIdleCount(idleCount + 1)
    },
    timeout: SESSION,
    throttle: 500,
    syncTimers: 200,
    crossTab: false
  });


  useEffect(() => {
    const interval = setInterval(() => {
      setIdleRemaining(Math.ceil(getRemainingTime() / 1000))
    }, 500)

    return () => {
      clearInterval(interval)
    }
  });
  useEffect(() => {
    updateCount();
    return () => clearInterval(timer)
  }, [count]);

  return {
    date: date,
    timer: timer,
    idleRemaining: idleRemaining,
    remainingTime: Math.ceil(getRemainingTime() / 1000),
    updateCount: updateCount,
    stopCount: stopCount,
    sessionStatus: sessionStatus,
  };
}
