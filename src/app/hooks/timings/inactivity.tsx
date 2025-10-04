import { useState, useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { notifications } from '@mantine/notifications';

import { IconPlayerPauseFilled } from '@tabler/icons-react';
/**
 * Configurations
 */
var FAST_SESSION = 10000;
var INACTIVITY = 600000;

/* --- */
var timer, inactivityTimer;

export default function inactivity(sessionStatus, setSessionStatus) {
  const [date, setDate] = useState(new Date());
  const [count, setCount] = useState(0);
  const [idleState, setIdleState] = useState<string>('Active')
  const [idleCount, setIdleCount] = useState<number>(0)
  const [idleRemaining, setIdleRemaining] = useState<number>(0)

  function updateCount() {
    timer = setInterval(() => {
      if(idleRemaining == 5) {
        var x;
        const id = notifications.show({
          loading: true,
          title: 'Sessione in ibernazione',
          message: "La sessione scadrà tra pochi secondi",
          autoClose: false,
          withCloseButton: false,
          autoClose: 4000,
        });
        x = setTimeout(() => {
          notifications.update({
            id,
            color: 'yellow',
            title: 'Sessione in pausa',
            icon: <IconPlayerPauseFilled size={18} />,
            loading: false,
            autoClose: 2000,
          });
        }, 3000);
      } else {
        if(x) {
          clearTimeout(x);
        }
        notifications.hide();
      }
      setCount(prevCount => prevCount + 1)
      setDate(new Date())
    }, 1000)
  }
  function stopCount() {
    // if (count === 3) {
    //
    console.log('stop!');
    clearInterval(timer);
    // return () => clearInterval(timer)
    // }
    console.log("date", date);
  }
  const { getRemainingTime } = useIdleTimer({
    onIdle: () => {
      setSessionStatus((sessionStatus == "play") ? "pause" : "play")
      if(sessionStatus == "play") { stopCount() } else { updateCount() }
      setIdleState('Idle');
    },
    onActive: () => {
      setIdleState('Active')
      // console.warn("OK!")
    },
    onAction: () => {
      setIdleCount(idleCount + 1)
    },
    timeout: INACTIVITY,
    throttle: 500,
    syncTimers: 200,
    crossTab: true
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
