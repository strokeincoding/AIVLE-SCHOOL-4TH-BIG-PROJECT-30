import React, { Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
 
 
 
 
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '', 
    };
  }
 
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: '' });
  };
 
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
 
    if (!username || !password) {
      this.setState({ error: '모든 필드를 채워주세요.' });
      return;
    }
 
    this.props.login(username, password, () => {
      this.props.navigate('/first'); 
    }, (errorMsg) => {
      alert(errorMsg);
    });
  };
 
  render() {
    const { isLoggedIn } = this.props;
    const { username, password, error } = this.state;
 
    if (isLoggedIn) {
      return <Navigate to="/" />;
    }
 
    return (
      <Container component="main" maxWidth="xs">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Box component="form" onSubmit={this.handleSubmit}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
              로그인
        </Typography>
        <TextField label="아이디"
          required
          fullWidth
          name="username"
          value={username}
          onChange={this.handleInputChange}
          autoFocus
          margin="normal"
        />
        <TextField
          label="비밀번호"
          type="password"
          required
          fullWidth
          name="password"
          value={password}
          onChange={this.handleInputChange}
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth variant="contained"
          sx={{mt : 3, mb : 2}}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
          </Grid>
          <Grid item>
            <Link href="Join">회원가입</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
    );
  }
}
 
 
export default function LoginWithAuth(props) {
  const navigate = useNavigate();
  const auth = useAuth();
  return <Login {...props} {...auth} navigate={navigate} />;
}