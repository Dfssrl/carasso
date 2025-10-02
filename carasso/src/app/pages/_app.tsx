import '@mantine/core/styles.css';

import type { AppProps } from 'next/app';
import {
  localStorageColorSchemeManager,
  MantineProvider,
} from '@mantine/core';

const theme = createTheme({
  colorScheme: 'light'
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState('light');

  return (
    <MantineProvider
      theme={theme}
      getRootElement={getRootElement}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}
