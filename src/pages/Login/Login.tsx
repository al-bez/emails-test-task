
import React, { FC, useEffect, useState } from 'react';
import './Login.scss';
import "react-dropdown/style.css";
import users from '../../static-data/users.json';
import { Dropdown } from '../../components';
import { Navigate } from 'react-router-dom';
import IMail from '../../types/Mail';


interface LoginProps {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  user: { name: string, index: number };
  selectUser: React.Dispatch<React.SetStateAction<{ name: string, index: number }>>;
}

const Login: FC<LoginProps> = ({ setIsAuth, isAuth, selectUser, user }) => {

  const users: { name: string, status: string }[] = JSON.parse(localStorage.getItem("users") || "[]");

  const onLogin = () => {
    if (user) {
      users[user.index].status = "active"
      localStorage.setItem('users', JSON.stringify(users))
      localStorage.setItem('lastUser', user.name)
      setIsAuth(true)
    }
  }

  return (
    <>
      {
        isAuth ?
          <Navigate to="/leads" />
          :
          <div className='wrapper'>
            <div className="login">
              <div className="login__dropdown" style={{ width: '200px' }}>
                <Dropdown onSelectUser={selectUser} />
              </div>
              <button className="login__btn" disabled={users.every(user => user.status === "active")} onClick={onLogin}>login</button>
            </div>
          </div>
      }
    </>
  )
}

export default Login