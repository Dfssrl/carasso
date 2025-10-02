import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useLocalStorage } from '@mantine/hooks';
import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
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
import classes from './Header.module.css';

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

// interface HeaderProps {
//   date: Date;
// }
// export function Header({ leadName, leadNumber, leadState, targetName, loginDate, date, count }: HeaderProps) {
export function Header({ leadName, leadNumber, leadState, targetName, dates, count }) {
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
  // const [date, setDate] = useState(dates.date.toLocaleString())

  const sessionLength = parseInt((dates.date.getTime() - new Date(dates.loginDate).getTime()) / 1000);

  // useState(() => {
  //   setDate(dates.date.toLocaleString())
  // }, [dates]);
  // console.log("loginDate", dates.loginDate);
  // console.log("date", dates.date);


  return (
    <header className={classes.header}>
      <Container fluid className={classes.inner}>
        <Box px={5} w={400}>
          <Logo4
           width={160}
           height={160}
           invert={dark.toString()}
          />
        </Box>

        <Group className={classes.controls}>
          <Stack gap={0}>
          <Text color="dimmed" fz={12} component="tt">Data: <b>{dates.date.toLocaleString()}</b></Text>
            <Text color="dimmed" fz={12} component="tt">Login: {new Date(dates.loginDate).toLocaleString()}</Text>
            <Text color="dimmed" fz={12} component="tt">Durata sessione: <b>{secondsToHms(sessionLength)}</b></Text>
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
            <Text ta="center" fz={14}>{targetName}</Text>
          </Stack>
            <Stack gap={0} align="flex-end">
              <Badge size="sm" variant="light" color="yellow">{leadState}</Badge>
              <Text ta="left" fz={20} color="dimmed" component="tt">{leadNumber}</Text>
            </Stack>
        </Group>

        <Group wrap="nowrap" gap={0} w={260} ml={20}>
          <Button
            color="green.7"
            rightSection={<IconPhone />}
            radius={10}
            pb={3}
            className={classes.button}
          >
            <Text>Chiama lead</Text>
          </Button>
          <Menu transitionProps={{ transition: 'pop' }} position="bottom-end" withinPortal>
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
                onClick={() => setColorScheme(!dark ? 'dark' : 'light')}
                title="Toggle color scheme"
              >
                {(dark) ? "Tema chiaro" : "Tema scuro"}
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                leftSection={<IconLogout size={16} stroke={1.5} color={theme.colors.blue[5]} />}
                onClick={() => {
                  // clearColorScheme();
                  setStorage({
                    name: 'auth',
                    value: false,
                    httpOnly: true,
                    path: '/',
                  });
                  setLoggedIn(false);
                }}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </header>
  );
}
