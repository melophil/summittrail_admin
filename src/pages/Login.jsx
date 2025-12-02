import React, { useState } from 'react';
import api, { setToken } from '../api';
import { useNavigate } from 'react-router-dom';
import "../Style/Admin/Login.css";


export default function Login({ onLogin }) {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [err,setErr] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login',{ email, password });
      const token = res.data.token;
      setToken(token);
      onLogin(token);
      nav('/');
    } catch (err) {
      setErr(err?.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="login-wrap">
      <form className="login-form" onSubmit={submit}>
        <h2>Admin Login</h2>
        {err && <div className="error">{err}</div>}
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
