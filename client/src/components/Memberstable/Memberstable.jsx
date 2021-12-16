import React, { useState, useEffect } from 'react'
import { Table, Container, Dropdown, Col, Row, Button, InputGroup, FormControl, Form } from 'react-bootstrap'
import Rowmember from '../Rowmember/Rowmember';


export default function Memberstable() {
    const [list, setList] = useState();
    const [mount, setMount] = useState(true);
    const [age, setAge] = useState();
    const [value, setValue] = useState(0);
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        if (mount) {
            getMembers(token)
                .then(members => {
                    console.log("New Render");
                    setList(members);
                    setMount(false);
                })
        }
    }, [])


    const descendingOrder = (list) => {
        const newList = list.sort((a, b) => {
            return b.age - a.age;
        });
        console.log(newList);
        setList(newList);
        setValue(value + 1);
    }

    const ascendingOrder = (list) => {
        const newList = list.sort((a, b) => {
            return a.age - b.age;
        });
        console.log(newList);
        setList(newList);
        setValue(value + 1);
    }

    const membersAboveage = async (token, age) => {
        const membersarray = await getMembersaboveage(token, age);
        setList(membersarray);
    }

    const ageChange = async (age) => {
        if (age === "") {
            const membersarray = await getMembers(token);
            setAge();
            setList(membersarray);
        } else {
            setAge(age);
            membersAboveage(token, age)
            console.log(age);
        }
    }



    return (
        <Container>
            <Row>
                <Col></Col>
                <Col md="auto"> <InputGroup className="mb-3">
                    <FormControl
                        onChange={(e) => { ageChange(e.target.value) }}
                        placeholder="Set Minimum age"
                        aria-label="Set Minimum age"
                        aria-describedby="basic-addon2"
                    />
                </InputGroup></Col>
                <Col md="auto">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Sort
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item as="button" onClick={() => { descendingOrder(list) }}>Age descending</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => { ascendingOrder(list) }} >Age Ascending</Dropdown.Item>
                            {/* <Dropdown.Item as="button" onClick={() => { membersAboveage(token, age) }}>Something else</Dropdown.Item> */}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {(list || []).map((member) => (
                        <Rowmember key={member._id} member={member} />
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}




async function getMembers(jwt) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch("http://localhost:4000/api/members", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

async function getMembersAsc(jwt) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch("http://localhost:4000/api/membersasc", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

async function getMembersDesc(jwt) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch("http://localhost:4000/api/membersdesc", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}



async function getMembersaboveage(jwt, age) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`http://localhost:4000/api/membersaboveage/${age}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));

}