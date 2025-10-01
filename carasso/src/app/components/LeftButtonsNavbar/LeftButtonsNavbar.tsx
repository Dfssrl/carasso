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
  Group,
  Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { NavbarLinksGroup, NavbarLinksSaloneVincente } from '../NavbarLinksGroup/NavbarLinksGroup';
// import { UserButton } from '../UserButton/UserButton';
// import { Logo } from './Logo';
import classes from './LeftButtonsNavbar.module.css';

const mockdata = [
  {
    label: 'Appuntamento fissato',
    color: "green",
    loading: false,
    icon: <IconCalendarCheck color="green" size={18} />
  },
  {
    label: 'Non risposto',
    color: "yellow",
    loading: false,
    icon: <IconPhoneOff color="yellow" size={18} />
  },
  {
    label: 'Da richiamare',
    color: "orange",
    loading: false,
    icon: <IconTimeDuration15 color="orange" size={18} />
  },
  {
    label: 'Fuori zona',
    color: "violet",
    loading: false,
    icon: <IconCellSignalOff color="violet" size={18} />
  },
  {
    label: 'Non interessato',
    color: "red",
    loading: false,
    icon: <IconBan color="#f88" size={18} />
  },
  {
    label: 'Non in target',
    color: "gray.5",
    loading: false,
    icon: <IconCurrentLocationOff color="#777" size={18} />
  },
];

export function LeftButtonsNavbar() {
  const [loading, { toggle }] = useDisclosure();
  const [isLoading, setLoading] = useState(loading);
  const links = mockdata.map((item) => (
      <Button
        py={10}
        px={20}
        size="md"
        fullWidth
        variant="subtle"
        color={item.color}
        key={item.label}
        leftSection={item.icon}
        className={classes.button}
        loading={item.loading}
        loaderProps={{ type: 'dots' }}
      >
        <Text fz={14}>{item.label}</Text>
      </Button>
    )
  );

  return (
    <nav className={classes.navbar}>
      <Text mb={20}>Esito ultima call</Text>

      <Button.Group className={classes.links} orientation="vertical">
        {links}
      </Button.Group>

      <div className={classes.footer}>
        
      </div>
    </nav>
  );
}
