import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import User from './Components/User/User';
import CreateUser from './Components/CreateUser/CreateUser';
import UpdateUser from './Components/UpdateUser/UpdateUser';
import DisplayUser from './Components/DisplayUser/DisplayUser';


function App() {
 

  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<User />}/>
          <Route path={"/createuser"} element={<CreateUser />}/>
          <Route path={"/updateuser/:id"} element={<UpdateUser />}/>
          <Route path={"/displayuser/:id"} element={<DisplayUser />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
