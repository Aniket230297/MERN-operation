import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./displayuser.css";
import axios from "axios";

const DisplayUser = () => {
  const [data, setData] = useState(null); 
  const { id } = useParams(); 
  const navigate=useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getUser/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, [id]);

  const backbtn=()=>{
    navigate('/');
  }

  if (!data) {
    return <p>Loading user data...</p>; 
  }

  return (
    <div className="userDetails">
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Mobile Number:</strong> {data.mobile}</p>
      <p><strong>Designation:</strong> {data.designation}</p>
      <button className="backbtn" onClick={()=>{backbtn()}}>Back</button>
    </div>
  );
};

export default DisplayUser;
