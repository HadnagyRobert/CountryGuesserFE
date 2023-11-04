import './App.css';
import { useState } from 'react';
import { Route, Routes} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Homepage from './Pages/HomePage/Homepage';
import Game from './Pages/GamePage/Game';
import AuthPage from './Pages/AuthPage/AuthPage';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import AdminPage from './Pages/AdminPage/AdminPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import AdminRoute from './Components/AdminRoute/AdminRoute';
import CreateCountry from './Components/CreateCountry/CreateCountry';
import EditCountry from './Components/EditCountry/EditCountry';
import { CountryContext } from './Components/CountryContext/CountryContext';
import AdminStatistics from './Components/AdminStatistics/AdminStatistics';
import Notifications from './Components/NotificationComponent/Notifications';


function App() {
  const [countries, setCountries] = useState([]);

  return (
    <div className="App">
        <Navbar />
        <Notifications />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/game/:gameId" element={<Game />} />
          <Route path="/homepage">
            <Route index element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            } />
          </Route>
          <Route path="/profile">
            <Route index element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
          </Route>
          <Route path="/admin" element={
            <AdminRoute>
              <CountryContext.Provider value={{ countries, setCountries }}>
                <AdminPage />
              </CountryContext.Provider>
            </AdminRoute>
          }>
              <Route index element={<AdminStatistics />} />
              <Route path='create' element={<CreateCountry />} />
              <Route path="edit" element={<EditCountry />} />
          </Route>
          <Route path="*" element={<h1>404 - Page not found</h1>} />
        </Routes>
    </div>
  );
}

export default App;
