import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./User.css";
import LoginContext from "../../component/context/LoginContext";
import axios from "axios";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  Phone,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";

export default function User(props) {
  const [date, setDate] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  console.log(userId);
  const loginCtx = useContext(LoginContext);
  const [imageFile, setImageFile] = useState(null);
  const baseUrl = "https://localhost:44364/api/user";

  useEffect(() => {
    axios({
      method: "GET",
      url: `${baseUrl}/${userId}`,
      headers: {
        Authorization: `Bearer ${loginCtx.token}`,
      },
    }).then((res) => {
      setImageFile(res.data.imageSrc);
      setUser(res.data);
      var t = new Date(res.data.dob);
      setDate(t.toDateString());
      console.log(date);
    });
  }, []);
  const initial = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    location: "",
    dob: "",
    username: "",
    confirmPassword: "",
    imageSrc: "photo",
    ProfilePicture: null,
  };
  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      initial.ProfilePicture = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageFile(imageFile);
        setImageFile(x.target.result);
      };
      reader.readAsDataURL(initial.ProfilePicture);
    }
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <button className="userAddButton">Create</button>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={imageFile} alt="" className="userShowImg" />
            <div className="usershowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              {/* <span className="userShowUserEmail">{user.emailId}</span> */}
            </div>
          </div>
          <div className="userShowButtom">
            <span className="userShowTitle">Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="showInfoTitle">{user.name}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="showInfoTitle">{date}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="showInfoTitle">{user.emailId}</span>
            </div>

            <div className="userShowInfo">
              <Phone className="userShowIcon" />
              <span className="showInfoTitle">{user.mobile}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="showInfoTitle">{user.location}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.name}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>D O B</label>
                <input
                  type="date"
                  placeholder={date}
                  value={date}
                  // style={{ display: "none" }}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.emailId}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Mobile</label>
                <input
                  type="text"
                  placeholder={user.mobile}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Location</label>
                <input
                  type="text"
                  placeholder={user.location}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={imageFile} />
                <label htmlFor="file">
                  <Publish style={{ cursor: "pointer" }} />
                </label>
                <input
                  accept="image/*"
                  onChange={showPreview}
                  name="image"
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
