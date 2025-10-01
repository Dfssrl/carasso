"use client";
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

import type { NextConfig } from 'next';
import {
  AppShell,
  Burger,
  Button,
  Center,
  Indicator,
  Stack,
  Text
} from '@mantine/core';
import {
  Calendar,
  MiniCalendar,
  getTimeRange,
  TimeGrid
} from '@mantine/dates';

import { Header } from './components/Header/Header.tsx';
import { LeftButtonsNavbar } from './components/LeftButtonsNavbar/LeftButtonsNavbar.tsx';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from './page.module.css';

export default function Home() {
  const [opened, { toggle }] = useDisclosure();
  const d = new Date();
  const [value, onChange] = useState(d);
  const [date, setDate] = useState(d);

  function updateClock() {
    // console.log(date);
    return dayjs(date).format('DD/MM/YYYY HH:mm');
  }

  const leadName = "Lead Name";
  const leadNumber = "+393452323232";
  var dateMDY = updateClock(date);
  const leadState = "Stato del lead";
  const targetName = "Nome centro estetico";

  useEffect(() => {
    const intervalID = setInterval(() => updateClock(date), 1000);
    var dateMDY = updateClock(date);
    console.log("dateMDY", dateMDY);

    return () => clearInterval(intervalID);
  }, [date]);

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
    >
      <AppShell.Header>
        <Header
          leadName={leadName}
          leadNumber={leadNumber}
          leadState={leadState}
          targetName={targetName}
          date={dateMDY}
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

          {/*
            <Calendar
            static
            renderDay={(date) => {
              const day = dayjs(date).date();
              return (
                <Indicator size={6} color="yellow" offset={-2} disabled={day !== 16}>
                  <div>{day}</div>
                </Indicator>
              );
            }}
          />
          */}
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
            // simpleGridProps={{
            //   type: 'container',
            //   cols: { base: 1, '180px': 2, '320px': 3 },
            //   spacing: 'xs',
            // }}
          />

          <LeftButtonsNavbar />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
      </AppShell.Main>
    </AppShell>
  );
}
