import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleDashboardClick = () => {
    router.push('/dashboard');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4">Welcome to Electrician Dashboard</Typography>
      <Button variant="contained" color="primary" onClick={handleDashboardClick} style={{ marginTop: '20px' }}>
        Go to Dashboard
      </Button>
    </div>
  );
}
