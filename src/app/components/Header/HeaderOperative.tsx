import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useLocalStorage } from '@mantine/hooks';
import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import dayjs from 'dayjs';
import {
  ActionIcon,
  Anchor,
  Badge,
  Button,
  Box,
  Burger,
  Container,
  Group,
  Menu,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  IconListDetails,
  IconLogout,
  IconBrandWhatsapp,
  IconPhone,
  IconCalendar,
  IconChevronDown,
  IconMoon,
  IconSun,
  IconTrash,
} from '@tabler/icons-react';
import { Logo1, Logo2, Logo3, Logo4, Logo5, Logo6 } from './Logo.tsx';
import classes from './HeaderOperative.module.css';


function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " ora" : " ore") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minuto" : " minuti") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " secondo" : " secondi") : "";

    return [
      (hDisplay.length > 0) ? hDisplay : null,
      (mDisplay.length > 0) ? mDisplay : null,
      (sDisplay.length > 0) ? sDisplay : null
    ].filter(n => n)
    .join(", ")
    .replace(/\,(?=[^,]*$)/, " e");
}

export function HeaderOperative({
  setDashboard,
  leadName,
  leadNumber,
  leadState,
  current_label,
  color,
  label,
  targetName,
  count,
  dates,
  timer,
  inactivityTimer,
  idleRemaining,
  updateCount,
  stopCount,
  // sessionLength,
  sessionStatus,
  setSessionStatus
}) {
  const { colorScheme, setColorScheme, clearColorScheme } = useMantineColorScheme();
  const dark = (colorScheme === "dark");
  const theme = useMantineTheme();
  const [storage, setStorage] = useLocalStorage({
    key: 'auth',
    value: true,
    date: new Date(),
    httpOnly: true,
    path: '/',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const sessionLength = parseInt((dates.date.getTime() - new Date(dates.loginDate).getTime()) / 1000);

      // console.log(idleRemaining);
  // console.log((sessionStatus == "pause") ? "blinking" : null);

  return (
    <header className={dark ? classes.header : classes.header_white}>
      <Container fluid className={classes.inner}>
        <Box px={5} w={340}>
          <Logo4
           width={160}
           height={160}
           invert={dark.toString()}
          />
        </Box>

        <Group className={classes.controls} grow>
          <Stack gap={0}>
            <Text color="dimmed" fz={11} component="tt">Data: <b>{dayjs(dates.date).format('YYYY-MM-DD HH:mm:ss')}</b></Text>
            <Text color="dimmed" fz={11} component="tt">Login: {dayjs(dates.loginDate).format('YYYY-MM-DD HH:mm:ss')}</Text>
            <Text
              color="dimmed"
              fz={11}
              component="tt"
              // className={(sessionStatus == "pause") ? classes.blinking : null}
            >
              Sessione dal login: <b>{secondsToHms(sessionLength)}</b>
            </Text>
            <Text color="dimmed" fz={11} component="tt">Scadenza attività: <b>{secondsToHms(inactivityTimer)}</b></Text>
          </Stack>

          <Stack gap={0}>
            <Text
              size="xl"
              ta="center"
              fw={900}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            >
              {leadName}
            </Text>
            <Text ta="center" color="dimmed" fz={14}>{targetName}</Text>
          </Stack>
          <Stack gap={0} align="flex-end">
            <Badge size="sm" variant="light" color={color}>{current_label}</Badge>
            <Text ta="left" fw={100} fz={20} color="dimmed" component="tt">{leadNumber}</Text>
          </Stack>

          <Group wrap="nowrap" gap={0} justify="flex-end" className={classes.call_button}>
            <Button
              disabled={sessionStatus == "pause"}
              color="green.7"
              rightSection={<IconPhone />}
              radius={10}
              pb={3}
              className={classes.button}
            >
              <Text>Chiama</Text>
            </Button>
            <Menu
              transitionProps={{ transition: 'pop' }}
              position="bottom-end"
              withinPortal
            >
              <Menu.Target>
                <ActionIcon
                  variant="filled"
                  color="teal.9"
                  size={36}
                  className={classes.menuControl}
                >
                  <IconChevronDown size={16} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={
                    dark ? (
                      <IconSun style={{ width: 18, height: 18 }} />
                    ) : (
                      <IconMoon style={{ width: 18, height: 18 }} />
                    )
                  }
                  color={dark ? 'yellow' : 'blue'}
                  title="Toggle color scheme"
                  onClick={() => setColorScheme(!dark ? 'dark' : 'light')}
                  >
                  {(dark) ? "Tema chiaro" : "Tema scuro"}
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item
                  leftSection={
                    dark ? (
                      <IconListDetails style={{ width: 18, height: 18 }} />
                    ) : (
                      <IconListDetails style={{ width: 18, height: 18 }} />
                    )
                  }
                  color={dark ? "gray.7" : "gray.4"}
                  title="Toggle color scheme"
                  >
                  Statistiche
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item
                  leftSection={<IconLogout size={16} stroke={1.5} color={theme.colors.blue[5]} />}
                  onClick={() => {
                    setSessionStatus("play");
                    // clearColorScheme();
                    setStorage({
                      name: 'auth',
                      value: false,
                      httpOnly: true,
                      path: '/',
                    });
                    setLoggedIn(false);
                    setDashboard(true);
                  }}
                  >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>

      </Container>
    </header>
  );
}
