import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Details from "./components/Details";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Companyshowstate from "./context/companyshowstate";
import AdminPanel from "./components/admin/AdminPanel";
import CreatePost from "./components/admin/CreatePost";
import StudentApplication from "./components/admin/StudentApplication";
import StudentInfo from "./components/admin/StudentInfo";
import ListCompanies from "./components/admin/ListCompanies";

import Logout from "./components/Logout";
import ForgetPassword from "./components/ForgetPassword";
import Profile from "./components/Profile";
import Recover from "./components/Recover";
import Contactus from "./components/Contactus";
import Aboutus from "./components/Aboutus";
import { useCookies } from "react-cookie";

import "./App.css";
function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  setCookie("name", "vihaan", {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    httpOnly: true,
  });
  return (
    <div className="App">
      <Companyshowstate>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login></Login>} />

            <Route path="/register" element={<Signup></Signup>} />

            <Route
              path="/internship/details/:companyname/:companyinfo"
              element={<Details />}
            />
            <Route
              path="/secure/adminpanel/:admintoken"
              element={<AdminPanel />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/recover/:id/:token" element={<Recover />}></Route>
            <Route path="/secure/createpost" element={<CreatePost/>}></Route>
            <Route path="/secure/listcompanies" element={<ListCompanies />}></Route>
            <Route path="/secure/studentinfo" element={<StudentInfo />}></Route>
            <Route path="/secure/studentapplication" element={<StudentApplication />}></Route>
            <Route path="/contactus" element={<Contactus/>}></Route>
            <Route path="/aboutus" element={<Aboutus/>}></Route>
          </Routes>
        </Router>
      </Companyshowstate>
    </div>
  );
}

export default App;
