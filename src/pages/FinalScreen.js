import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { handleAmountChange, handleScoreChange } from "../redux/actions";
import { Container, Row, Col } from "react-bootstrap";

const FinalScreen = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const { score } = useSelector((state) => state);

  const handleBackToSettings = () => {
    disptach(handleScoreChange(0));
    disptach(handleAmountChange(50));
    navigate("/");
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm="5 mt-5">
          <Box mt={30}>
            <Typography variant="h3" fontWeight="bold" mb={3}>
              Final Score {score}
            </Typography>
            <Button onClick={handleBackToSettings} variant="outlined">
              back to settings!
            </Button>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default FinalScreen;
