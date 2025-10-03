"use client";
import { useEffect, useState } from 'react';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import dayjs from 'dayjs';

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
  Loader,
  Stack,
  Text,
  useMantineColorScheme
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

import { Header } from '../../components/Header/Header.tsx';
import { LeftButtonsNavbar } from '../../components/LeftButtonsNavbar/LeftButtonsNavbar.tsx';
import { RightNavbar } from '../../components/RightNavbar/RightNavbar.tsx';
import Auth from '../../components/auth';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from './dashboard.module.css';

export default function Dashboard({ count, date }) {
  const { colorScheme, setColorScheme, clearColorScheme } = useMantineColorScheme();
  const dark = (colorScheme === "dark");
  const [opened, { toggle }] = useDisclosure();
  const storage = JSON.parse(localStorage.getItem("auth"));
  const [leadStatus, setLeadStatus] = useState("new");

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
        />
      </AppShell.Header>

      <AppShell.Navbar px={20} pt={20} align="center" bg={dark ? "#242424" : "#fefefe"}>
        <LeftButtonsNavbar
          leadStates={leadStates}
          leadStatus={leadStatus}
          setLeadStatus={setLeadStatus}
          current_status={current_status}
        />

        <AppShell.Section mb={20} p={0}>
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

      <AppShell.Aside px={20} pt={20} align="center" bg={dark ? "#242424" : "#fefefe"}>
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

      <AppShell.Main pt={84} pl={299} pr={290} pb={0} bg={dark ? "#242424" : "#fefefe"}>
        <Box
          m={0}
          p={20}
          className={dark ? classes.body : classes.body_white}
        >
          <Loader
            color={(dark ? 'var(--mantine-color-blue-9)' : 'var(--mantine-color-blue-2)')}
            size="sm"
            type="bars"
            ml="50%"
            mt="40vh"
          />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

// export default withAuth(Dashboard);
