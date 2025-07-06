import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
    const [form, setForm] = useState({email: '', password: ''})
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, form);

            localStorage.setItem('token', res.data.token);
            
            alert("Logged in!");
            navigate('/dashboard');
        } catch (err) {
             alert(err?.response?.data?.msg || "Something went wrong");
        }
    }
    return (
        <div>
        <h2>Login here...</h2>
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} /><br /><br />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br /><br />
      <button>Login</button>
        </form>
        </div>
    )
}

export default Login;