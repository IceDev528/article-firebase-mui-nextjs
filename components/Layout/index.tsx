import { PropsWithChildren, ReactNode } from "react";
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import Navbar from "components/Layout/navbar";
import styles from "styles/Home.module.css";

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
  },
});

export default function Layout({ children }: PropsWithChildren<any>) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <main className={styles.container}>{children}</main>
    </ThemeProvider>
  );
}
