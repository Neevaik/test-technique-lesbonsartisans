//#region imports
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from '@/reducers/users';
import SignUpModal from '@/component/signupModal';
//#endregion

const defaultTheme = createTheme();

export default function LoginPage() {

  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = React.useState(null);
  const [openSignUp, setOpenSignUp] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://localhost:3001/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(login({
          username: data.user.username,
          token: data.token,
        }));

        router.push('/home');

      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    }
  };

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("https://images.pexels.com/photos/3791466/pexels-photo-3791466.jpeg")',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                error={!!error}
                helperText={error}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                error={!!error}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={handleOpenSignUp}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <SignUpModal open={openSignUp} handleClose={handleCloseSignUp} />
    </ThemeProvider>
  );
}
