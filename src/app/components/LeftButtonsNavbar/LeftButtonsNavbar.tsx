import { useState, useRef, useContext } from 'react';
import { randomId, useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import {
  Calendar,
  MiniCalendar,
  getTimeRange,
  TimeGrid
} from '@mantine/dates';
import {
  IconBan,
  IconCalendarCheck,
  IconCalendarStats,
  IconCellSignalOff,
  IconCurrentLocationOff,
  IconLock,
  IconNotes,
  IconPhoneOff,
  IconTimeDuration15,
  IconBrandWhatsappFilled,
} from '@tabler/icons-react';
import {
  Button,
  Center,
  Container,
  Group,
  Pagination,
  ScrollArea,
  Stack,
  Text,
  useMantineColorScheme
} from '@mantine/core';

import { NavbarLinksGroup, NavbarLinksSaloneVincente } from '../NavbarLinksGroup/NavbarLinksGroup';
// import { UserButton } from '../UserButton/UserButton';
// import { Logo } from './Logo';
import classes from './LeftButtonsNavbar.module.css';

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}
const cabine = [
  {key: "cabina-1", name: "Cabina 1", color: "lime"},
  {key: "cabina-2", name: "Cabina 2", color: "green"},
  {key: "cabina-3", name: "Cabina 3", color: "teal"},
]



export function LeftButtonsNavbar({leadStates, leadStatus, setLeadStatus, current_status, sessionStatus}) {
  const { colorScheme, setColorScheme, clearColorScheme } = useMantineColorScheme();
  const dark = (colorScheme === "dark");
  const [loading, { toggle }] = useDisclosure();
  const [isLoading, setLoading] = useState(loading);
  const d = new Date();
  const [value, onChange] = useState(d);
  const viewport = useRef<HTMLDivElement>(null);
  const [activePage, setPage] = useState(1);
  const links = leadStates.map((item) => (
      <Button
        disabled={sessionStatus == "pause"}
        px={0}
        size="md"
        justify="space-between"
        fullWidth
        variant={item.current_status ? "outline" : "subtle"}
        color={sessionStatus == "pause" ? "gray" : item.color}
        key={item.label}
        rightSection={item.icon}
        px={10}
        className={classes.button}
        loading={item.loading}
        loaderProps={{ type: 'dots' }}
        onClick={(btn) => {
          if(item.state !== leadStatus) {
            setLeadStatus(item.state);
            // console.log(item.state, leadStatus, current_status);
          }
        }}
      >
        <Text fz={14}>{item.label}</Text>
      </Button>
    )
  );
    // console.log("current_status", leadStatus, current_status);

  const items = cabine.map((item, k) => (
    <Text key={item.key}>
      key: {item.key}, name: {item.name}
    </Text>
  ));
  return (
    <nav className={classes.navbar}>
      <Stack gap={0}>
        <Group justify="space-between" mb={20} px={10}>
          <Text mt={10} color="dimmed">Cabina</Text>
          <Pagination
            mt={10}
            withControls={false}
            total={cabine.length}
            value={activePage}
            onChange={setPage}
          />
        </Group>

        <Text color="dimmed" px={10} mb={10}>Calendario</Text>
        <MiniCalendar
          mb={20}
          numberOfDays={5}
          minDate={dayjs(d).format('YYYY-MM-DD')}
          maxDate={sessionStatus == "pause" ? dayjs(d).subtract(7, 'year').format('YYYY-MM-DD') : null}
          getDayProps={(date) => ({
            style: {
              color: [0, 6].includes(dayjs(date).day()) ? 'var(--mantine-color-red-8)' : (dark ? 'var(--mantine-color-white-9)' : 'var(--mantine-color-gray-8)'),
            },
          })}
          value={value}
          onChange={onChange}
        />

        <ScrollArea.Autosize
          mih={100}
          mah={600}
          type="auto"
          offsetScrollbars
          px={0}
          ml={10}
          mx="auto"
          viewportRef={viewport}
        >
          <Text color="dimmed" mb={10}>Fascia oraria</Text>
          <Stack gap={20}>
            <TimeGrid
              disabled={sessionStatus == "pause"}
              pr={10}
              mb={10}
              data={
                getTimeRange({
                  startTime: '09:00',
                  endTime: '18:00',
                  interval: '00:30'
                }
              )}
              disableTime={['13:30', '14:00']}
              defaultValue={"09:00"}
              withSeconds={false}
              allowDeselect
              simpleGridProps={{ cols: 4, spacing: 'xs' }}
            />

            <Text color="dimmed" mt={0} mb={-10}>Esito ultima call</Text>
            <Button.Group
              orientation="vertical"
              className={classes.links}
              mr={10}
            >
              {links}
            </Button.Group>
          </Stack>
        </ScrollArea.Autosize>
      </Stack>
    </nav>
  );
}
