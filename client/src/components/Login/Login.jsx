import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

async function loginUser(username, password) {
    return fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(username, password)
    })
        .then(data => data.json())
}


export default function Login(props) {
    const { setToken } = props;
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    let history = useHistory();
    const toregsiter = () => {
        history.push('/register')
    }
    const tohome = () => {
        history.push('/')
    }
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({ username, password });
        if (token.data === 'User does not exist' || token.data === 'Please verify your user' || token.data === 'Invalid username/password') {
            alert(token.data);
        } else {
            sessionStorage.setItem('token', token.data);
            sessionStorage.setItem('first_name', token.user[0].first_name);
            setToken(token.data);
            tohome();
        }
    }

    return (
        <div>
            <h1>Please Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={e => setUserName(e.target.value)} type="text" placeholder="Enter username" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>{" "}
                <Button variant="primary" onClick={toregsiter}>
                    Register
                </Button>
            </Form>
        </div>
    );
}