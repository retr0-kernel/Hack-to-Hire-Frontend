// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Container, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     container: {
//         textAlign: 'center',
//         marginTop: theme.spacing(5),
//     },
//     button: {
//         margin: theme.spacing(2),
//     },
// }));

// function LandingPage() {
//     const navigate = useNavigate();
//     const classes = useStyles();

//     return (
//         <Container className={classes.container}>
//             <Typography variant="h4" gutterBottom>
//                 Welcome to Flight Status Management
//             </Typography>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 onClick={() => navigate('/admin/login')}
//             >
//                 Admin Login
//             </Button>
//             <Button
//                 variant="contained"
//                 color="secondary"
//                 className={classes.button}
//                 onClick={() => navigate('/user/login')}
//             >
//                 User Login
//             </Button>
//             <Button
//                 variant="contained"
//                 className={classes.button}
//                 onClick={() => navigate('/user/register')}
//             >
//                 User Register
//             </Button>
//         </Container>
//     );
// }

// export default LandingPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Flight Tracker</h1>
          <div className="space-x-4">
            <button onClick={() => navigate('/user/login')} className="text-white hover:text-blue-300">Login</button>
            <button onClick={() => navigate('/user/register')} className="text-white hover:text-blue-300">Register</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 text-center">
        <h2 className="text-5xl font-bold mb-4">Stay Informed, Stay Ahead</h2>
        <p className="text-xl mb-8">Track your flights in real-time and manage your travel with ease</p>
        <button onClick={() => navigate('/user/register')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full text-lg transition duration-300">
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4">Real-Time Updates</h4>
              <p>Get instant notifications on flight status changes, delays, and cancellations.</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4">Comprehensive Details</h4>
              <p>Access detailed flight information, including gate numbers, terminal maps, and baggage claim details.</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4">Personalized Tracking</h4>
              <p>Save your favorite routes and flights to stay on top of your travel plans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Tailored Experiences</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <h4 className="text-2xl font-semibold mb-4">User Dashboard</h4>
              <p className="mb-6">Track your personal flight details, receive push notifications, and access comprehensive flight information.</p>
              <button onClick={() => navigate('/user/login')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300">
                User Login
              </button>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <h4 className="text-2xl font-semibold mb-4">Admin Dashboard</h4>
              <p className="mb-6">Monitor airport operations, manage flight data, and generate comprehensive reports.</p>
              <button onClick={() => navigate('/admin/login')} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition duration-300">
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <p>&copy; 2024 Flight Tracker. All rights reserved.</p>
            <div className="space-x-4">
              <a href="#" className="text-white hover:text-blue-300">Terms of Service</a>
              <a href="#" className="text-white hover:text-blue-300">Privacy Policy</a>
              <a href="#" className="text-white hover:text-blue-300">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;