import React, { useEffect, useState } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom'
import { Leads, Login, Main, Overview } from './pages';
import emails from './static-data/emails.json';

function App() {

  const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem('lastUser'))
  const [user, selectUser] = useState<{ name: string, index: number }>({ name: 'User 1', index: 0 })

  useEffect(() => {
    if (localStorage.getItem('emails') === null) {
      localStorage.setItem("emails", JSON.stringify(emails))
    }
  }, [])


  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Main isAuth={isAuth} />} />
        <Route path="/login" element={<Login isAuth={isAuth} setIsAuth={setIsAuth} user={user} selectUser={selectUser} />} />
        <Route path="/leads" element={<Leads setIsAuth={setIsAuth} isAuth={isAuth} user={user} />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </div>
  );
}

export default App
