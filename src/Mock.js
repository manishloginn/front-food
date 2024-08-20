import axios from "axios";
import React, { useState } from "react";
// import "./styles.css";

const APIURL = "https://jsonplaceholder.typicode.com/users";
function Mockapp() {

    const [data, setdata] = useState([])
    const [togle, settogle] = useState(false)


    const getUsers = () => {
        axios.get(APIURL).then((res) => {
            setdata(res.data)
        }).catch((err) => console.log(err))
    }
    const sortList = () => {

        settogle((prev) => !prev)

      
        const sortedData = data.sort((a, b) => {
            if (togle) {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        })

        setdata(sortedData)
    }

    return (
        <main>
            <h1>User List</h1>
            <div>
                <button onClick={getUsers}>Get Users</button>
                <button onClick={sortList}>Sort list </button>
            </div>
            <ul>
                {
                    data.map((user) => {
                        return (
                            <li key={user.id}>{user.name}</li>
                        )
                    })
                }
            </ul>
        </main>
    )
}

export default Mockapp;