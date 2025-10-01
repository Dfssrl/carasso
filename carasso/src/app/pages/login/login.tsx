import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';

import { Logo1, Logo2, Logo3, Logo4, Logo5, Logo6 } from '../../components/Header/Logo.tsx';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { useLocalStorage } from '@mantine/hooks';
// import { GoogleButton } from './GoogleButton';
// import { TwitterButton } from './TwitterButton';

import classes from './Login.module.css';

export default function Login({loggedIn, setLoggedIn}) {
  const [type, toggle] = useToggle(['login', 'register']);
  const [storage, setStorage] = useLocalStorage({
    key: 'auth',
    value: false,
    httpOnly: true,
    path: '/',
  });
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <div className={classes.wrapper}>
      <Paper
        p={30}
        w={450}
        h="100vh"
        radius={0}
        className={classes.form}
      >
        <Center mt="10vh" mb="10vh">
          <Logo1 width="70%" height="70%" />
        </Center>

        {/* Google and Twitter login buttons
          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
            <TwitterButton radius="xl">Twitter</TwitterButton>
          </Group>
        */}

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit((data) => {
          if(data.email == "admin@salone.vincente" && data.password == "admin_tour") {
            setStorage({
              name: 'auth',
              value: true,
              httpOnly: true,
              path: '/',
            });
            setLoggedIn(true);
          }
        })}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
