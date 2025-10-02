"use client";
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useLocalStorage } from '@mantine/hooks';
import { Loader } from '@mantine/core';

import type { NextConfig } from 'next';
import {
  AppShell,
  Box,
  Burger,
  Button,
  Center,
  Container,
  Group,
  Indicator,
  Stack,
  Text
} from '@mantine/core';
import {
  IconBrandWhatsappFilled,
  IconPhonePlus,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
  IconBan,
  IconCalendarCheck,
  IconCellSignalOff,
  IconCurrentLocationOff,
  IconPhoneOff,
  IconTimeDuration15,
} from '@tabler/icons-react';
import {
  Calendar,
  MiniCalendar,
  getTimeRange,
  TimeGrid
} from '@mantine/dates';

import { Header } from '../../components/Header/Header.tsx';
import { LeftButtonsNavbar } from '../../components/LeftButtonsNavbar/LeftButtonsNavbar.tsx';
import { RightNavbar } from '../../components/RightNavbar/RightNavbar.tsx';
import Auth from '../../components/auth';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from './dashboard.module.css';

export default function Dashboard() {
  const [opened, { toggle }] = useDisclosure();
  // const [storage, setStorage] = useLocalStorage({
  //   key: 'auth',
  //   value: true,
  //   date: new Date(),
  //   httpOnly: true,
  //   path: '/',
  // });
  const storage = JSON.parse(localStorage.getItem("auth"));
  const d = new Date();
  const [value, onChange] = useState(d);
  const [dat, setDate] = useState();
  var date = new Date();
  // console.log("storage", storage);


  const state = { date: new Date(), status: 'Stop' };

  const start = () => {
    var timer = setInterval(() => {
      state.date = new Date();
    }, 1000);
  };

  // const handleClick = () => {
  //   if (this.state.status == 'Stop') {
  //     setState({ status: 'Start' });
  //     clearInterval(this.timer);
  //   } else {
  //     setState({ status: 'Stop' });
  //     start();
  //   }
  // };

  const lead = {
    name: "Lead name",
    targetName: "Nome centro estetico",
    number: "+393452323232",
    state: "new",
    loginDate: storage.date
  }
  const leadStates = [
    {
      state: "new",
      label: 'Nuovo',
      color: "yellow",
      loading: true,
      icon: <IconPhonePlus color="yellow" size={18} />
    },
    {
      state: "appointed",
      label: 'Appuntamento fissato',
      color: "green",
      loading: false,
      icon: <IconCalendarCheck color="green" size={18} />
    },
    {
      state: "not-replied",
      label: 'Non risposto',
      color: "yellow",
      loading: false,
      icon: <IconPhoneOff color="yellow" size={18} />
    },
    {
      state: "recall",
      label: 'Da richiamare',
      color: "orange",
      loading: false,
      icon: <IconTimeDuration15 color="orange" size={18} />
    },
    {
      state: "Out",
      label: 'Fuori zona',
      color: "violet",
      loading: false,
      icon: <IconCellSignalOff color="violet" size={18} />
    },
    {
      state: "not-interested",
      label: 'Non interessato',
      color: "red",
      loading: false,
      icon: <IconBan color="#f88" size={18} />
    },
    {
      state: "not-target",
      label: 'Non in target',
      color: "gray.5",
      loading: false,
      icon: <IconCurrentLocationOff color="gray" size={18} />
    }
  ];

  useEffect(() => {
    start();
    // console.log("date", storage.date);
  }, [dat]);

  return (
    <AppShell
      padding={20}
      header={{
        height: 85,
      }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      footer={{
        width: 300,
      }}
    >
      <AppShell.Header>
        <Header
          leadName={lead.name}
          leadNumber={lead.number}
          leadState={lead.state}
          targetName={lead.targetName}
          loginDate={lead.loginDate}
          // date={state.date.toLocaleString()}
        />
      </AppShell.Header>

      <AppShell.Navbar px={20} pt={20} align="center">
        <Stack align="center" justify="flex-start" gap={40}>
          <Center>
            <Button.Group>
              <Button variant="default" size="xs">Cabina 1</Button>
              <Button variant="default" size="xs">Cabina 2</Button>
              <Button variant="default" size="xs">Cabina 3</Button>
            </Button.Group>
          </Center>

          <MiniCalendar
            value={value}
            onChange={onChange}
            numberOfDays={5}
            getDayProps={(date) => ({
              style: {
                color: [0, 6].includes(dayjs(date).day()) ? 'var(--mantine-color-red-8)' : undefined,
              },
            })}
          />

          <TimeGrid
            data={getTimeRange({
              startTime: '09:00',
              endTime: '18:00',
              interval: '00:30'
            })}
            disableTime={['13:30', '14:00']}
            defaultValue={"09:00"}
            withSeconds={false}
            allowDeselect
            simpleGridProps={{ cols: 4, spacing: 'xs' }}
          />

          <LeftButtonsNavbar />
        </Stack>

        <AppShell.Section my={30} p={0}>
          <Button
            size="lg"
            color="green"
            fullWidth
            leftSection={<IconBrandWhatsappFilled />}
            radius={5}
          >
            <Text>Invia link acconto</Text>
          </Button>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Aside px={20} pt={20} align="center">
        <RightNavbar date={lead.loginDate} />

        <AppShell.Section mb={20} p={0}>
          {/* BUTTONS */}
          <Stack gap={10}>
            <Group grow gap={5}>
              <Button
                disabled
                size="sm"
                color="gray"
                rightSection={<IconPlayerPauseFilled color="gray" opacity={0.70} />}
                radius={5}
              >
                <Stack gap={0}>
                  <Text ta="left" fz={14} mt={2}>PAUSA</Text>
                  <Text ta="left" fz={10} ta="left" mt={-4}>TIMER</Text>
                </Stack>
              </Button>
              <Button
                disabled
                size="sm"
                color="dark"
                rightSection={<IconPlayerStopFilled color="gray" opacity={0.40} />}
                radius={5}
              >
                <Text fz={9} ta="left">INTERROMPI<br/>SESSIONE</Text>
              </Button>
            </Group>

            <Button
              size="lg"
              color="cyan"
              fullWidth
              rightSection={<IconPlayerPlayFilled color="white" opacity={0.65} />}
              radius={5}
            >
              <Text>Prosegui</Text>
            </Button>
          </Stack>
        </AppShell.Section>
      </AppShell.Aside>

      <AppShell.Main pt={84} pl={299} pr={290} pb={0}>
        <Box m={0} p={20} className={classes.body}>
          <Loader color="gray" size="sm" type="bars" ml="50%" mt="40vh" />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

// export default withAuth(Dashboard);
