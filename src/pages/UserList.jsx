import React from "react";
import { useEffect, useContext, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import LoginContext from "../component/context/LoginContext";
import "./userList.css";
import { DeleteOutline, Edit } from "@material-ui/icons";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://localhost:44364/api/user";

export default function DataTable() {
  const loginCtx = useContext(LoginContext);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      method: "Get",
      url: `${baseUrl}/get`,
      headers: {
        Authorization: `Bearer ${loginCtx.token}`,
      },
    }).then((res) => {
      // console.log(res.data);
      setRows(res.data);
    });
  }, []);
  const handleDelete = (id) => {
    axios({
      method: "DELETE",
      url: `${baseUrl}/${id}`,
      headers: {
        Authorization: `Bearer ${loginCtx.token}`,
      },
    });
    setRows(rows.filter((row) => row.id != id));
  };
  const columns = [
    {
      field: "name",
      headerName: "User",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userDiv">
            <img className="userLogo" src={params.row.imageSrc} alt="alt" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "emailId",
      headerName: "Email",
      width: 200,
    },
    {
      field: "dob",
      headerName: "DOB",
      type: "date",
      width: 150,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 150,
    },

    {
      field: "location",
      headerName: "Location",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Edit
              onClick={() => navigate(`/user/${params.row.id}`)}
              className="edit"
            />
            <DeleteOutline
              onClick={() => handleDelete(params.row.id)}
              className="delete"
            />
          </>
        );
      },
    },
  ];

  return (
    <Container fluid>
      <Row className="align-items-center justify-content-center mt-5">
        <Col sm="12">
          <div style={{ height: 400 }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
