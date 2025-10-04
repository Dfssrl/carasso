"use client";
import { useEffect, useState } from 'react';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import dayjs from 'dayjs';

import type { NextConfig } from 'next';
import {
  AppShell,
  AspectRatio,
  Box,
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
  Stack,
  Text,
  Transition,
  Tooltip,
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

export default function Dashboard({
  count,
  date,
  timer,
  // setInactivityTimerActive,
  inactivityTimer,
  idleRemaining,
  updateCount,
  stopCount,
  sessionLength,
  sessionStatus,
  setSessionStatus,
  callingStatus,
  setCallingStatus,
}) {
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

      <AppShell.Navbar px={20} pt={20} align="center" bg={dark ? "#242424" : "#fefefe"}>
        <LeftButtonsNavbar
          leadStates={leadStates}
          leadStatus={leadStatus}
          setLeadStatus={setLeadStatus}
          current_status={current_status}
          sessionStatus={sessionStatus}
        />

        <AppShell.Section mb={20} p={0}>
          <Button
            disabled={sessionStatus == "pause"}
            size="lg"
            color="green"
            fullWidth
            rightSection={<IconBrandWhatsappFilled />}
            radius={5}
          >
            <Text>Invia link acconto</Text>
          </Button>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Aside px={20} pt={20} align="center" bg={dark ? "#242424" : "#fefefe"}>
        <RightNavbar date={lead.loginDate} sessionStatus={sessionStatus} />

        <AppShell.Section mb={20} p={0}>
          {/* BUTTONS */}
          <Stack gap={10}>
            <Button.Group>
              <Button
                disabled={sessionStatus == "pause"}
                fullWidth
                size="lg"
                loading={false}
                color={(sessionStatus == "play") ? "yellow" : "cyan"}
                rightSection={
                  (sessionStatus == "play")
                    ? <IconPlayerPauseFilled opacity={0.50} />
                    : <IconPlayerPlayFilled opacity={0.50} />
                }
                onClick={() => {
                  setSessionStatus((sessionStatus == "play") ? "pause" : "play")
                  if(sessionStatus == "play") { stopCount() } else { updateCount() }
                }}
              >
                <Text>Pausa sessione</Text>
              </Button>
              <Tooltip label="Interrompi sessione" color="blue.9" position="top-end" withArrow>
                <Button
                  size="lg"
                  variant="light"
                  color="red"
                  pl={10}
                  rightSection={<IconPlayerStopFilled size={30} opacity={0.30} />}
                >
                </Button>
              </Tooltip>
            </Button.Group>
          </Stack>
        </AppShell.Section>
      </AppShell.Aside>

      <AppShell.Main pt={84} pl={299} pr={317} pb={0} bg={dark ? "#242424" : "#fefefe"}>
        <Box
          m={0}
          p={20}
          className={dark ? classes.body : classes.body_white}
        >
          {
            (sessionStatus == "pause")
              ? <>
                  <Transition
                    mounted={true}
                    transition="fade"
                    duration={200}
                    timingFunction="ease"
                    keepMounted
                  >
                    {(styles) => <div>
                      <Overlay
                        color={dark ? "#000" : "#000"}
                        backgroundOpacity={dark ? 0.4 : 0.2}
                        blur={6}
                        zIndex={200}
                      />
                    </div>}
                  </Transition>
                  <Stack px="10vw" pt="15vh" align="flex-start" className={classes.stack_overlay}>
                    <Group mb={120}>
                      <IconPlayerPauseFilled size={100} color="var(--mantine-color-orange-filled" opacity={dark ? 0.4 : 0.5} />
                      <Stack gap={0}>
                      <Text color={dark ? "dimmed" : "dark"} fz={50}>Sessione in pausa</Text>
                        <Text color={dark ? "dimmed" : "gray.7"} fz={16} mt={20}>
                        La sessione è stata interrotta manualmente o si è attivata per una inattività di oltre 10 minuti.
                        </Text>
                      </Stack>
                    </Group>
                    <Stack>
                      <Button
                        size="lg"
                        fullWidth={false}
                        loading={false}
                        color="teal.5"
                        rightSection={<IconPlayerPlayFilled size={30} opacity={0.50} />}
                        onClick={() => {
                          // setInactivityTimerActive(false);
                          setSessionStatus((sessionStatus == "play") ? "pause" : "play")
                          if(sessionStatus == "play") { stopCount() } else { updateCount() }
                        }}
                      >
                        <Text>Riprendi sessione</Text>
                      </Button>
                      <Divider my="md" color={dark ? "gray.7" : "gray.4"} />
                      <Button
                        size="xs"
                        variant={dark ? "light" : ""}
                        color="red.5"
                        pl={10}
                        rightSection={<IconPlayerStopFilled size={20} opacity={0.30} />}
                      >
                        <Text fz={13}>Interrompi sessione</Text>
                      </Button>
                    </Stack>
                    <Skeleton height={8} mt={50} radius="xl" />
                    <Skeleton height={8} mt={6} radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </Stack>
                </>
              : <Loader
                  color={(dark ? 'var(--mantine-color-blue-9)' : 'var(--mantine-color-blue-2)')}
                  size="sm"
                  type="bars"
                  ml="50%"
                  mt="40vh"
                />
          }
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

// export default withAuth(Dashboard);
