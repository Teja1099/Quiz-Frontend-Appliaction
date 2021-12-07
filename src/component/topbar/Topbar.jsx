import React, { useEffect, useContext, useState } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import photo from "../images/photo.png";
import axios from "axios";
import LoginContext from "../context/LoginContext";

export default function Topbar() {
  const loginCtx = useContext(LoginContext);
  const [image, setImage] = useState(null);
  const baseUrl = "https://localhost:44364/api/user";
  useEffect(() => {
    axios({
      method: "GET",
      url: `${baseUrl}/${loginCtx.id}`,
      headers: {
        Authorization: `Bearer ${loginCtx.token}`,
      },
    }).then((res) => {
      setImage(res.data.imageSrc);
      console.log(image);
      console.log(res.data);
    });
  }, [image]);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Minds </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          {/* <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
            <span className="topIconBadge">2</span>
          </div> */}
          <img src={image} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
