import Index from "./pages/Index";
import LoginContext from "./component/context/LoginContext";
import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import Leadboard from "./pages/Leadboard";
import { SignUp } from "./pages/SignUp";
import UserList from "./pages/UserList";
import Topbar from "./component/topbar/Topbar";
import Sidebar from "./component/sidebar/Sidebar";
import style from "./app.css";

function App() {
  const loginCtx = useContext(LoginContext);
  return (
    <div>
      <div>
        {loginCtx.isLoggedIn && <Topbar />}
        {/* <Container fluid> */}
        <div className="container1">
          {loginCtx.isLoggedIn && <Sidebar />}

          <div className="others">
            <Routes>
              {!loginCtx.isLoggedIn && (
                <Route path="*" element={<Navigate to="/login" />} />
              )}
              {!loginCtx.isLoggedIn && (
                <Route path="/login" element={<Login />}>
                  {/* <Route path="profile" element={<Profile />} />
                  <Route path="quiz" element={<Quiz />} />
                  <Route path="leadboard" element={<Leadboard />} /> */}
                </Route>
              )}
              <Route path="/signup" element={<SignUp />} />
              {loginCtx.isLoggedIn && (
                <Route path="*" element={<Navigate to="/index" />} />
              )}
              {loginCtx.isLoggedIn && (
                <Route path="/userList" element={<UserList />} />
              )}
              {loginCtx.isLoggedIn && (
                <Route path="/profile" element={<Profile />} />
              )}
              {loginCtx.isLoggedIn && <Route path="/quiz" element={<Quiz />} />}
              {loginCtx.isLoggedIn && (
                <Route path="/leadboard" element={<Leadboard />} />
              )}
              {loginCtx.isLoggedIn && (
                <Route path="/userList" element={<UserList />} />
              )}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
