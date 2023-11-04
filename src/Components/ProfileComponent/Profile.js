import React, { useEffect, useState } from 'react';
import UserAPI from "../../Apis/UserAPI";
import './Profile.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Profile = () => {
    const [accessToken, setAccessToken] = useState('');
    const [gameData, setGameData] = useState([]);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
    });

      useEffect(() => {
          setAccessToken(localStorage.getItem("jwtToken"));
        const fetchUserData = async () => {
          try {
            const data = await UserAPI.getAccount(accessToken);
            setUserData(data);
            const gameData = await UserAPI.getUserStatistics(accessToken);
            setGameData(gameData.userStatistics);
          } catch (error) {
            console.error("Failed to fetch user data:", error);
          }
        };
    
        if(accessToken) { 
          fetchUserData();
        }
      }, [accessToken]);

  return (
    <div className='profile-container'>
      <h2>Profile Information</h2>

      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Last Name: {userData.lastName}</p>
      <p>First Name: {userData.firstName}</p>
      <h2>Game Statistics</h2>

      <BarChart width={1000} height={300} data={gameData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="avgScore" fill="#82ca9d" />
      </BarChart>
      <BarChart width={1000} height={300} data={gameData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="winRate" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Profile;
