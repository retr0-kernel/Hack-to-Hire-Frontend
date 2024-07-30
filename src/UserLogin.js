// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Container, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     container: {
//         textAlign: 'center',
//         marginTop: theme.spacing(5),
//     },
//     textField: {
//         margin: theme.spacing(2),
//         width: '300px',
//     },
//     button: {
//         margin: theme.spacing(2),
//     },
// }));

// function UserLogin() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const classes = useStyles();

//     const handleLogin = async () => {
//         try {
//             const { data } = await axios.post('http://localhost:5000/user/login', { username, password });
//             localStorage.setItem('token', data.access_token);
//             navigate('/user/dashboard');
//         } catch (error) {
//             setError('Invalid credentials');
//         }
//     };

//     return (
//         <Container className={classes.container}>
//             <Typography variant="h4" gutterBottom>
//                 User Login
//             </Typography>
//             <TextField
//                 label="Username"
//                 variant="outlined"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className={classes.textField}
//             />
//             <TextField
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={classes.textField}
//             />
//             {error && <Typography color="error">{error}</Typography>}
//             <Button variant="contained" color="primary" onClick={handleLogin} className={classes.button}>
//                 Login
//             </Button>
//         </Container>
//     );
// }

// export default UserLogin;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/user/login', { username, password });
      localStorage.setItem('token', data.access_token);
      navigate('/user/dashboard');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Flight Status
          </h2>
        </div>
        <div className="bg-gray-800 p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-white mb-2">Login</h3>
          <p className="text-gray-400 text-sm mb-6">
            Enter your username and password to access your account.
          </p>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-400">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                  Forgot password?
                </a>
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;