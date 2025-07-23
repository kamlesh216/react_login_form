import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6d00',
    },
    secondary: {
      main: '#fff',
    },
    error: {
      main: '#ff1744',
    },
    success: {
      main: '#388e3c',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
    fontWeightBold: 700,
  },
});

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSubmitted(true);
    if (Object.keys(validationErrors).length === 0) {
      setMessage(`Welcome, ${username}!`);
    } else {
      setMessage('');
    }
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
    setErrors({});
    setSubmitted(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: '#f5f6fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            maxWidth: 370,
            width: '100%',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'mui-slide-in 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
             Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }} autoComplete="off">
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); if (submitted) setErrors(validate()); }}
              error={Boolean(errors.username)}
              helperText={errors.username}
              autoFocus
              variant="outlined"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (submitted) setErrors(validate()); }}
              error={Boolean(errors.password)}
              helperText={errors.password}
              variant="outlined"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); if (submitted) setErrors(validate()); }}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              variant="outlined"
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ fontWeight: 'bold', boxShadow: 2, textTransform: 'none' }}
              >
                Login
              </Button>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                color="error"
                onClick={handleCancel}
                sx={{ fontWeight: 'bold', textTransform: 'none', borderWidth: 2 }}
              >
                Cancel
              </Button>
            </Box>
            {message && (
              <Typography
                variant="subtitle1"
                sx={{ color: 'success.main', mt: 3, fontWeight: 500, textAlign: 'center', animation: 'mui-fade-in 0.5s' }}
              >
                {message}
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
      <style>{`
        @keyframes mui-slide-in {
          0% { opacity: 0; transform: translateY(40px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes mui-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </ThemeProvider>
  );
}

export default App;
