import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'


export default function Logout(props) {
    const { setToken } = props;
    let history = useHistory();


    function handleClick() {
        sessionStorage.clear();
        setToken(null);
        history.push("/");
    }

    return (
        <div>
            <Button variant="danger" onClick={handleClick}>Logout</Button>
        </div>
    )

}
