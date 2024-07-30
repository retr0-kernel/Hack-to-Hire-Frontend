// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LandingPage from './LandingPage';
// import AdminLogin from './AdminLogin';
// import UserLogin from './UserLogin';
// import UserRegister from './UserRegister';
// import AdminDashboard from './AdminDashboard';
// import UserDashboard from './UserDashboard';

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<LandingPage />} />
//                 <Route path="/admin/login" element={<AdminLogin />} />
//                 <Route path="/user/login" element={<UserLogin />} />
//                 <Route path="/user/register" element={<UserRegister />} />
//                 <Route path="/admin/dashboard" element={<AdminDashboard />} />
//                 <Route path="/user/dashboard" element={<UserDashboard />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import AdminLogin from './AdminLogin';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/admin/dashboard" element={<PrivateRoute component={AdminDashboard} />} />
                <Route path="/user/dashboard" element={<PrivateRoute component={UserDashboard} />} />
            </Routes>
        </Router>
    );
}

const PrivateRoute = ({ component: Component }) => {
    return localStorage.getItem('token') ? <Component /> : <Navigate to="/" />;
};

export default App;
