"use client";
import { useEffect, useState } from 'react';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import dayjs from 'dayjs';

import type { NextConfig } from 'next';
import {
  AppShell,
  AspectRatio,
  Box,
  Card,
  Burger,
  Button,
  Divider,
  Center,
  Container,
  Group,
  Indicator,
  Loader,
  Overlay,
  Skeleton,
  SimpleGrid,
  Stack,
  Text,
  Transition,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme
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
  IconGauge,
  IconChevronRight,
  IconChecklist,
  IconPhoneDone,
  IconFilePhone,
  IconListDetails,
} from '@tabler/icons-react';

import { Header } from '../../../components/Header/Header.tsx';
import { LeftButtonsNavbar } from '../../../components/LeftButtonsNavbar/LeftButtonsNavbar.tsx';
import { RightNavbar } from '../../../components/RightNavbar/RightNavbar.tsx';
import Auth from '../../../components/auth';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from './operative.module.css';

export default function Dashboard({
  setDashboard,
  date,
  count,
  timer,
  inactivityTimer,
  idleRemaining,
  updateCount,
  stopCount,
  sessionStatus,
  setSessionStatus,
  callingStatus,
  setCallingStatus
}) {
  const theme = useMantineTheme();
  const { colorScheme, setColorScheme, clearColorScheme } = useMantineColorScheme();
  const dark = (colorScheme === "dark");
  const [opened, { toggle }] = useDisclosure();
  const storage = JSON.parse(localStorage.getItem("auth"));
  const [leadStatus, setLeadStatus] = useState("new");

  const user_stats = {
    last_month_earning: 100,
    estimated_earning_this_month: 200
  }
  /**
   * Lead States
   * @type {Array}
   *
   * - state
   * - label
   * - current_status
   * - color
   * - loading
   * - icon
   */
  const leadStates = [
    {
      state: "new",
      label: 'Nuovo',
      current_status: (leadStatus == "new"),
      color: "green",
      loading: false,
      icon: <IconPhonePlus color="green" size={18} />
    },
    {
      state: "appointed",
      label: 'Appuntamento fissato',
      current_status: (leadStatus == "appointed"),
      color: "teal",
      loading: false,
      icon: <IconCalendarCheck color="teal" size={18} />
    },
    {
      state: "not-replied",
      label: 'Non risposto',
      current_status: (leadStatus == "not-replied"),
      color: "cyan",
      loading: false,
      icon: <IconPhoneOff color="cyan" size={18} />
    },
    {
      state: "recall",
      label: 'Da richiamare',
      current_status: (leadStatus == "recall"),
      color: "orange",
      loading: false,
      icon: <IconTimeDuration15 color="orange" size={18} />
    },
    {
      state: "Out",
      label: 'Fuori zona',
      current_status: (leadStatus == "Out"),
      color: "violet",
      loading: false,
      icon: <IconCellSignalOff color="violet" size={18} />
    },
    {
      state: "not-interested",
      label: 'Non interessato',
      current_status: (leadStatus == "not-interested"),
      color: "red",
      loading: false,
      icon: <IconBan color="#f88" size={18} />
    },
    {
      state: "not-target",
      label: 'Non in target',
      current_status: (leadStatus == "not-target"),
      color: "gray.5",
      loading: false,
      icon: <IconCurrentLocationOff color="gray" size={18} />
    }
  ];

  // Fetch DB data
  // ...
      /**
       * Current lead data
       * @type {Object}
       *
       * - name
       * - targetName
       * - number
       * - state
       * - loginDate
       */
      const lead = {
        name: "Lead name",
        targetName: "Nome centro estetico",
        number: "+393452323232",
        state: "new",
        loginDate: storage.date
      }
  // ...


  const dates = {
    date: date,
    loginDate: storage.date,
    sessionLength: count
  }
  const state = leadStates.filter((item, i) => (lead.state === item.state) && item)[0]);
  const current_status = leadStates.filter((item, i) => (lead.state === item.state) && item)[0].current_status)
  const current_color = leadStates.filter((item, i) => (leadStatus === item.state) && item)[0].color)
  const current_label = leadStates.filter((item, i) => (leadStatus === item.state) && item)[0].label)

  const mockdata = [
    {
      key: 'call-today',
      title: 'Chiamate',
      subtitle: 'oggi',
      count: 10,
      icon: IconPhoneDone,
    },
    {
      key: 'call-this-month',
      title: 'Chiamate',
      subtitle: 'questo mese',
      count: 300,
      icon: IconFilePhone,
    },
    {
      key: 'appointments-today',
      title: 'Appuntamenti',
      subtitle: 'oggi',
      count: 3,
      icon: IconChecklist,
    },
    {
      key: 'appointments-this-month',
      title: 'Appuntamenti',
      subtitle: 'questo mese',
      count: 30,
      icon: IconListDetails,
    },
  ];

  const features = mockdata.map((feature, i) => (
    <Card key={feature.key} shadow="md" radius={15} className={classes.card} padding="xl" ta="center">
      <Group justify="space-between">
        <Stack align="flex-start" justify="center" gap={0}>
          <Text fz="lg" fw={500} className={classes.cardTitle}>
            {feature.title}
          </Text>
          <Text fz="lg" fw={500} color="dimmed" className={classes.cardSubTitle}>
            {feature.subtitle}
          </Text>
        </Stack>
        <feature.icon size={70} stroke={1.5} color={dark ? theme.colors.teal[5] : theme.colors.cyan[4]} opacity={0.3} />
      </Group>
      <Text fz={70} fw={100} c="dimmed" mt={20}>
      {feature.count}
      </Text>
    </Card>
  ));

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
        collapsed: { mobile: !opened },
      }}
      aside={{
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
          current_label={current_label}
          color={current_color}
          label={state.label}
          targetName={lead.targetName}
          count={count}
          dates={dates}
          timer={timer}
          inactivityTimer={inactivityTimer}
          idleRemaining={idleRemaining}
          updateCount={updateCount}
          stopCount={stopCount}
          // sessionLength={sessionLength}
          sessionStatus={sessionStatus}
          setSessionStatus={setSessionStatus}
        />
      </AppShell.Header>

      <AppShell.Main pt={84} pl={299} pr={317} pb={0} bg={dark ? "#242424" : "#fefefe"}>
        <Container px={0} py={40} size="xl">
          <SimpleGrid cols={{ base: 1, md: 4 }} spacing="lg" mt={20}>
            {features}
          </SimpleGrid>
        </Container>

        <Stack my={25} gap={5}>
          <Text fz="lg" color={dark ? "gray.5" : "gray.7"}>Guadagno del mese precedente: {user_stats.last_month_earning}€</Text>
          <Text fz="lg" color={dark ? "gray.5" : "gray.7"}>Guadagno di questo mese: {user_stats.estimated_earning_this_month}€</Text>
        </Stack>

        <Container mt="16vh">
          <Center>
            <Button
              size="xl"
              justify="space-between"
              color="green"
              w={300}
              rightSection={<IconChevronRight size={20} />}
              radius={5}
              onClick={() => setDashboard(false)}
            >
              <Text>Avvia sessione</Text>
            </Button>
          </Center>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

// export default withAuth(Dashboard);
