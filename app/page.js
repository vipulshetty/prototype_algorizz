"use client";
import { useRouter } from 'next/navigation';
import { Button, Typography, Container, Box } from '@mui/material';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="md" className={styles.container}>
      <Box className={styles.box}>
        <Typography variant="h4" className={styles.title}>
          Welcome to the Service Management System
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/dashboard')}
          className={styles.button}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Container>
  );
}
