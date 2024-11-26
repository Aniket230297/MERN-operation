import  { useState } from "react";
import "./createuser.css";
import axios from 'axios';
import {useNavigate} from "react-router-dom"

function CreateUser() {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("React Developer");

  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post("http://localhost:3001/createuser", {name, email, mobile, designation})
    .then((res=>{console.log(res)
        navigate('/')
    }))
    .catch((err=>console.log(err)))
    
  };

  return (
    <div className="formContainer">
      <h2>Add New Employee</h2>
      <form className="userForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        {/* Designation Dropdown */}
        <select
          name="designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          required
        >
          <option value="React Developer">React Developer</option>
          <option value="Android Developer">Android Developer</option>
          <option value="MERN Stack Developer">MERN Stack Developer</option>
        </select>

        <button type="submit" className="submitBtn">
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
