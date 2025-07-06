import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({name: '', email: '', password: '' })
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm(prev => ({ ...prev , [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, form);
           if (!form.email.includes("@") || form.email.length < 5) {
   alert("Enter a valid email");
   return;
}

            alert('Registred');
            navigate('/login');
        } catch (err) {
              alert(err?.response?.data?.msg || "Something went wrong");

        }
    }

    return (
        <div>
        <h2>Register here...</h2>
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} /> <br /> <br />
            <input name="email" placeholder="Email" onChange={handleChange} /> <br /><br />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} /> <br /> <br />
            <button>Register</button>
        </form>
</div>
    )
    

}

export default Register;