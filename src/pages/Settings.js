import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import SelectField from "../component/SelectField";
import TextFieldComp from "../component/TextFieldComp";
import useAxios from "../hooks/useAxios";
import { Container, Row, Col } from "react-bootstrap";

const Settings = () => {
  const { response, error, loading } = useAxios({ url: "/api_category.php" });
  const navigate = useNavigate();

  if (loading) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col sm="5 mt-5">
            <Box mt={20}>
              <CircularProgress />
            </Box>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col sm="5 mt-5">
            <Typography variant="h6" mt={20} color="red">
              Something Went Wrong, Try Again!
            </Typography>
          </Col>
        </Row>
      </Container>
    );
  }

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choise" },
    { id: "boolean", name: "True/False" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/questions");
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm="5 mt-5">
          <form onSubmit={handleSubmit}>
            <SelectField
              options={response.trivia_categories}
              label="Category"
            />
            <SelectField options={difficultyOptions} label="Difficulty" />
            <SelectField options={typeOptions} label="Type" />
            <TextFieldComp />
            <Box mt={3} width="100%">
              <Button fullWidth variant="contained" type="submit">
                Get Started
              </Button>
            </Box>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
