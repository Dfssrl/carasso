import { useState, useRef } from 'react';
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
  IconX,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Button,
  Center,
  Container,
  Flex,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  useListState,
  useDisclosure
} from '@mantine/hooks';

import { NavbarLinksGroup, NavbarLinksSaloneVincente } from '../NavbarLinksGroup/NavbarLinksGroup';
// import { UserButton } from '../UserButton/UserButton';
// import { Logo } from './Logo';
import classes from './RightNavbar.module.css';

export function RightNavbar({date}) {
  const [notes, handlers] = useListState([]);
  const viewport = useRef<HTMLDivElement>(null);
  const scrollToTop = () => viewport.current!.scrollTo(
    { top: 0, behavior: 'smooth' }
  );
  const scrollToCenter = () => viewport.current!.scrollTo(
    { top: viewport.current!.scrollHeight / 2, behavior: 'smooth' }
  );
  const scrollToBottom = () => viewport.current!.scrollTo(
    { top: viewport.current!.scrollHeight, behavior: 'smooth' }
  );

  const handleKeyPress = e => {
    if (e.key === 'Enter' && e.currentTarget.value.length > 1) {
      // AsyncStorage.setItem('any_key_here', value);
      console.log(e.currentTarget.value, date);
      handlers.prepend({text: e.currentTarget.value, date: date.toString()});
      e.currentTarget.value = "";
      // scrollToTop();
    }
  };



  return (
    <nav className={classes.navbar}>
      <Text color="dimmed" mb={10}>Risposte moduli</Text>
      <Container
        valign="top"
        strategy="grid"
        bg="var(--mantine-color-blue-light)"
        radius={10}
        p={10}
        mb={20}
      >
        <Center>
          <Loader color="gray.7" size="xs" type="dots" />
        </Center>
      </Container>

      {/* NOTES */}
      <Text color="dimmed" mt={40} mb={5}>Note aggiuntive</Text>
      <TextInput
        key="note"
        size="xs"
        description="Inserisci una nota e premi Invio per salvarla"
        placeholder="Inserisci una nota..."
        // inputWrapperOrder={['label', 'input', 'description', 'error']}
        onChange={(e) => {
          // e.currentTarget.value = "";
        }}
        onKeyPress={e => handleKeyPress(e)}
      />

      {(notes.length > 0) && <Paper
        shadow="md"
        valign="top"
        strategy="grid"
        mt={15}
        width={100}
      >
        <ScrollArea.Autosize
          mih={100}
          mah={500}
          type="auto"
          viewportRef={viewport}
        >
          <Stack gap={10} my={10}>
            {notes.map((item, index) => (
              <Paper
                key={index}
                py={10}
                px={15}
                className={classes.nota}
              >
                <Group justify="space-between">
                  <Text
                    fz={14}
                    fs="italic"
                    color="white"
                    truncate="end"
                    lineClamp={5}
                    component="p"
                  >
                  {item.text}
                  </Text>

                  <Button
                    color="white"
                    variant="subtle"
                    // size="xs"
                    size="compact-xs"
                    radius={12}
                    px={5}
                    mt={-8}
                    mr={-8}
                    onClick={() => handlers.remove(index)}
                  >
                      <IconX style={{ width: 10, height: 10 }} stroke={1.5} />
                  </Button>
                </Group>
                <Text
                  fz={8}
                  color="dimmed"
                  truncate="end"
                  lineClamp={5}
                  component="tt"
                >
                {item.date}
                </Text>
              </Paper>
            ))}
          </Stack>
        </ScrollArea.Autosize>
      </Paper>}
    </nav>
  );
}
