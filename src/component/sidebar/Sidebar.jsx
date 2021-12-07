import React, { useState } from "react";
import "./Sidebar.css";
import { Row } from "react-bootstrap";
import {
  LineStyle,
  ExitToApp,
  PermIdentity,
  VideogameAsset,
  BarChart,
  WorkOutline,
} from "@material-ui/icons";
import LoginContext from "../context/LoginContext";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  let navigate = useNavigate();
  const [customStyle, setCustomStyle] = useState("sidebarListItem ");
  const loginCtx = useContext(LoginContext);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className={customStyle}>
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            <li
              className={customStyle}
              onClick={() => {
                // setCustomStyle(`${customStyle} active`);
                navigate("/leadboard");
              }}
            >
              {/* <NavLink
                to="/leadboard"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "rgb(240, 240, 255)" : "",
                  };
                }}
              > */}
              <BarChart className="sidebarIcon" />
              Leadboard
              {/* </NavLink>*/}
            </li>

            <li className="sidebarListItem " onClick={() => navigate("/quiz")}>
              <VideogameAsset className="sidebarIcon" />
              Quiz
            </li>

            <li
              className="sidebarListItem "
              onClick={() => navigate(`user/${loginCtx.id}`)}
            >
              <PermIdentity className="sidebarIcon" />
              Profile
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Admin Operation</h3>
          <ul className="sidebarList">
            <li
              onClick={() => navigate("/userList")}
              className="sidebarListItem  "
            >
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Actions</h3>
          <ul className="sidebarList">
            <li
              onClick={() => {
                loginCtx.logout();
                navigate("/login");
              }}
              className="sidebarListItem  "
            >
              <ExitToApp className="sidebarIcon" />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
