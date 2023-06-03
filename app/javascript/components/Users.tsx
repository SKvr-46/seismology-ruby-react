import React from "react"
import { useEffect, useState } from "react";

export const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
    try {
    const response = await fetch("/users", {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    },
    });
    if (!response.ok) {
        throw new Error("Calculation failed.");
    }

    const data = await response.json();
    setUsers(data);
    } catch (error) {
        console.error(error);
    }
    };

    fetchData();
    }, []);

    return (
        <>
            <h1>Users</h1>
            <ul>
            {users.map((user) => (
            <li key={user}>{user}</li>
            ))}
            </ul>
            <a href="/users/new">New user</a>
        </>
    )
}