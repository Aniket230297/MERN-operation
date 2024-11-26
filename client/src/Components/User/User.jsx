import { useEffect, useState } from "react";
import "./user.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function User() {
  const [data, setData] = useState([]);

 const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001").then((res) => {
      setData(res.data);
    });
  }, []);

  const handleClick = (id) => {
    axios
      .delete("http://localhost:3001/deleteUser/" + id)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((res) => console.log(res));
  };

  const displayInfo=(id)=>{
    console.log(id);
    navigate(`./displayuser/${id}`)
  }

  return (
    <div className="mainContainer">
      <div className="userContainer">
        <Link to="/createuser" className="addBtn">
          Add Employee +
        </Link>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>mobile Number</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((item, id) => (
                <tr key={id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>{item.designation}</td>
                  <td className="actionIcon">
                    <RemoveRedEyeOutlinedIcon
                      onClick={()=>displayInfo(item._id)}
                      style={{ cursor: "pointer", backgroundColor: "green", color: "white",
                        padding: "0.3rem",}}
                    />
                    <Link to={`/updateuser/${item._id}`}>
                      <EditOutlinedIcon
                        style={{
                          cursor: "pointer",
                          backgroundColor: "blue",
                          color: "white",
                          padding: "0.3rem",
                          marginTop: "0.2rem",
                        }}
                      />
                    </Link>
                    <DeleteOutlineOutlinedIcon
                      onClick={() => handleClick(item._id)}
                      style={{
                        cursor: "pointer",
                        color: "white",
                        padding: "0.3rem",
                        backgroundColor: "red",
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
