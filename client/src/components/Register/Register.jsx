import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom"

async function registeruser(username, first_name, last_name, email, age, password) {
    return fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(username, first_name, last_name, email, age, password)
    })
        .then(data => data.json())
}

export default function Register() {
    const [username, setUserName] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();
    const handleSubmit = async e => {
        e.preventDefault();
        const data = await registeruser({
            username,
            first_name,
            last_name,
            email,
            age,
            password
        });
        if (data.message === "User already exists") {
            alert(data.message);
        } else {
            alert(data.message);
            e.target.reset();
            history.push('/');
        }


    }
    return (
        <div>
            <h1>Don't Have A User?</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control onChange={e => setUserName(e.target.value)} type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control onChange={e => setFirstName(e.target.value)} type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control onChange={e => setLastName(e.target.value)} type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control onChange={e => setEmail(e.target.value)} type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Age</Form.Label>
                    <Form.Control onChange={e => setAge(e.target.value)} type="number" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => setPassword(e.target.value)} type="password" required />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Register
                </Button>
            </Form>
        </div>

    )
}
