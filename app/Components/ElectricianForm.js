import { useState } from 'react';
import { Button, TextField, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';

const ElectricianForm = () => {
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState(''); // Make sure email is included if needed
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/electricians', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, expertise, contact, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to add electrician:', errorData);
        setError('Failed to add electrician');
        return;
      }

      setName('');
      setExpertise('');
      setContact('');
      setEmail('');
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to add electrician');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Expertise"
        value={expertise}
        onChange={(e) => setExpertise(e.target.value)}
        required
      />
      <TextField
        label="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Electrician
      </Button>
      <Snackbar open={success} autoHideDuration={2000}>
        <Alert severity="success">Electrician added successfully!</Alert>
      </Snackbar>
      <Snackbar open={Boolean(error)} autoHideDuration={2000}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </form>
  );
};

export default ElectricianForm;
