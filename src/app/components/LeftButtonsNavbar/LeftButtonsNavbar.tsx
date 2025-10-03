import { useState, useRef, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
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
  Group,
  ScrollArea,
  Stack,
  Text,
  useMantineColorScheme
} from '@mantine/core';

import { NavbarLinksGroup, NavbarLinksSaloneVincente } from '../NavbarLinksGroup/NavbarLinksGroup';
// import { UserButton } from '../UserButton/UserButton';
// import { Logo } from './Logo';
import classes from './LeftButtonsNavbar.module.css';

export function LeftButtonsNavbar({leadStates, leadStatus, setLeadStatus, current_status}) {
  const { colorScheme, setColorScheme, clearColorScheme } = useMantineColorScheme();
  const dark = (colorScheme === "dark");
  const [loading, { toggle }] = useDisclosure();
  const [isLoading, setLoading] = useState(loading);
  const d = new Date();
  const [value, onChange] = useState(d);
  const viewport = useRef<HTMLDivElement>(null);
  const links = leadStates.map((item) => (
      <Button
        px={0}
        size="md"
        justify="space-between"
        fullWidth
        // disabled={item.state == leadStatus}
        variant={item.current_status ? "outline" : "subtle"}
        color={item.color}
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

  return (
    <nav className={classes.navbar}>
      <Stack gap={0}>
        <Center mt={10} mb={40}>
          <Button.Group>
            <Button variant="outline" color="lime" size="xs">Cabina 1</Button>
            <Button variant="outline" color="green" size="xs">Cabina 2</Button>
            <Button variant="outline" color="teal" size="xs">Cabina 3</Button>
          </Button.Group>
        </Center>

        <MiniCalendar
          value={value}
          onChange={onChange}
          numberOfDays={5}
          pb={30}
          getDayProps={(date) => ({
            style: {
              color: [0, 6].includes(dayjs(date).day()) ? 'var(--mantine-color-red-8)' : (dark ? 'var(--mantine-color-white-9)' : 'var(--mantine-color-gray-8)'),
            },
          })}
        />
        <ScrollArea.Autosize
          mih={100}
          mah={575}
          type="auto"
          offsetScrollbars
          px={0}
          ml={10}
          mx="auto"
          viewportRef={viewport}
        >
          <Stack gap={20}>
            <TimeGrid
              pr={10}
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

            <Text color="dimmed" mt={20} mb={-10}>Esito ultima call</Text>
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
