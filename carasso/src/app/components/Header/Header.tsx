import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
  Anchor,
  Badge,
  Button,
  Box,
  Burger,
  Container,
  Group,
  Stack,
  Text
} from '@mantine/core';
import {
  IconBrandWhatsapp,
} from '@tabler/icons-react';
import { Logo } from './Logo.tsx';
import classes from './Header.module.css';


interface HeaderProps {
  date: string;
}
export function Header({ leadName, leadNumber, leadState, targetName, date }: HeaderProps) {

  return (
    <header className={classes.header}>
      <Container fluid className={classes.inner}>
        <Box px={5}>
          <Logo
           width={70}
           height={70}
          />
        </Box>

        <Group>
          <Stack gap={0}>
            <Text ta="center" mb={5}>{leadName}</Text>
            <Text ta="center" fz={10} fw={100} color="dimmed" component="tt">{leadNumber}</Text>
            <Badge size="sm" variant="light">{date}</Badge>
          </Stack>
          <Stack>
            <Text>{leadState}</Text>
            <Text>{targetName}</Text>
          </Stack>
        </Group>

        <Button
          size="lg"
          color="teal"
          rightSection={<IconBrandWhatsapp />}
          radius={10}
          pb={3}
        >
          <Text>Chiama lead</Text>
        </Button>
      </Container>
    </header>
  );
}
