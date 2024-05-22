import React, { useState } from 'react';

export default function Login(props) {
    
    const { reset, setReset } = props;
    const [err, setErr] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        if (!email || !password) {
            alert("Not NULL");
            return;
        }
        
        const formData = new FormData();
        formData.append("action", "login");
        formData.append("email", email);
        formData.append("password", password);

        fetch('http://localhost/todosFile/login.php', {
            method: "POST",
            body: formData,
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                setErr(0);
                setReset(!reset);
                localStorage.setItem('user', JSON.stringify(true));
            } else {
                setErr(1);
            }
        });
    }

    return (
        <>
            <h1>LOGIN</h1>
            {err ? <span style={{color: "red"}}>Kullanici Bulunamadi</span> : ""}
            <div>
                <span>Email:</span>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <span>Password:</span>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
        </>
    );
}
