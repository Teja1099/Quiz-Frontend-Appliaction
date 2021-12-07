import React from "react";
import Topbar from "../component/topbar/Topbar";
import Sidebar from "../component/sidebar/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { SignUp } from "./SignUp";
import Login from "./Login";
import Profile from "./Profile";
import Quiz from "./Quiz";
import Leadboard from "./Leadboard";
import LoginContext from "../component/context/LoginContext";
import { useContext } from "react";
import "./index.css";
import UserList from "./UserList";

export default function Index() {
  const loginCtx = useContext(LoginContext);
  return <div></div>;
}
