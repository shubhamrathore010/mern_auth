import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Dashboard() {
    const [users, setUsers]  = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
 
    if(!token)  {
      alert("Unauthorized. Please log in.");
      navigate("/login");
      return;
    }
         axios
         .get(`${import.meta.env.VITE_API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        // console.error("Failed to fetch users:", err);
        alert("Invalid or expired token. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      });
      }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>All Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard;