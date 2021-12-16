import React from 'react'



export default function Rowmember(props) {
    const { first_name, last_name, username, age, email } = props.member;

    return (
        <tr>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{username}</td>
            <td>{age}</td>
            <td>{email}</td>
        </tr>
    )
}