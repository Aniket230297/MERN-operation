import { useNavigate, useParams } from "react-router-dom";
import "./updateuser.css";
import { useEffect, useState } from "react";
import axios from "axios";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("React Developer");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:3001/getUser/" + id).then((res) => {
      console.log(res);
      setName(res.data.name);
      setEmail(res.data.email);
      setMobile(res.data.mobile);
      setDesignation(res.data.designation);
    });
  }, []);

  const update= (e)=>{
    e.preventDefault();
  
    axios.put(`http://localhost:3001/updateUser/${id}`, {name, email, mobile, designation})
    .then((res=>{console.log(res)
        navigate('/')
    }))
    .catch((err=>console.log(err.response)))
  }

  return (
    <div className="formContainer">
      <h2>Update Employee</h2>
      <form className="userForm" onSubmit={update}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          required
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        {/* Designation Dropdown */}
        <select
          name="designation"
          required
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        >
          <option value="React Developer">React Developer</option>
          <option value="Android Developer">Android Developer</option>
          <option value="MERN Stack Developer">MERN Stack Developer</option>
        </select>

        <button type="submit" className="submitBtn">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
