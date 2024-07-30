// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, TextField, Button, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import { useNavigate } from 'react-router-dom';

// const useStyles = makeStyles((theme) => ({
//     container: {
//         textAlign: 'center',
//         marginTop: theme.spacing(10),
//     },
//     textField: {
//         margin: theme.spacing(2),
//         width: '80%',
//     },
//     button: {
//         margin: theme.spacing(2),
//     },
// }));

// function UserRegister() {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [password, setPassword] = useState('');
//     const classes = useStyles();
//     const navigate = useNavigate();

//     const handleRegister = async () => {
//         try {
//             await axios.post('http://localhost:5000/user/register', {
//                 username,
//                 email,
//                 phone,
//                 password,
//             });
//             alert('User registered successfully');
//             navigate('/user/login')
//         } catch (error) {
//             console.error('Error registering user', error);
//         }
//     };

//     return (
//         <Container className={classes.container}>
//             <Typography variant="h4" gutterBottom>
//                 User Registration
//             </Typography>
//             <TextField
//                 label="Username"
//                 variant="outlined"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className={classes.textField}
//             />
//             <TextField
//                 label="Email"
//                 variant="outlined"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={classes.textField}
//             />
//             <TextField
//                 label="Phone"
//                 variant="outlined"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
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
//             <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 onClick={handleRegister}
//             >
//                 Register
//             </Button>
//         </Container>
//     );
// }

// export default UserRegister;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/user/register', {
        username,
        email,
        phone,
        password,
      });
      alert('User registered successfully');
      navigate('/user/login');
    } catch (error) {
      console.error('Error registering user', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Register for Flight Status
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Create an account to access real-time flight information and updates.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                placeholder="Enter your password"
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
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;