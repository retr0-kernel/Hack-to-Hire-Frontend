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

// function AdminLogin() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const classes = useStyles();

//     const handleLogin = async () => {
//         try {
//             const { data } = await axios.post('http://localhost:5000/admin/login', { username, password });
//             localStorage.setItem('token', data.access_token);
//             navigate('/admin/dashboard');
//         } catch (error) {
//             setError('Invalid credentials');
//         }
//     };

//     return (
//         <Container className={classes.container}>
//             <Typography variant="h4" gutterBottom>
//                 Admin Login
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

// export default AdminLogin;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/admin/login', { username, password });
      localStorage.setItem('token', data.access_token);
      navigate('/admin/dashboard');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your credentials to access the flight schedule and status dashboard.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;