import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import { handleScoreChange } from "../redux/actions";
import { Container, Row, Col } from "react-bootstrap";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Questions = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
    // return (document.getElementById("btn").style.backgroundColor = "green");
  }, [response, questionIndex]);
  const classes = useStyles();
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

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      const timer = () => {
        setTimeout(() => {
          e.target.style.backgroundColor = "green";
        }, 1000);
      };
      timer();
      e.target.style.backgroundColor = "blue";
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      e.target.style.backgroundColor = "red";
      e.target.style.backgroundColor = "blue";
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/score");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm="5 mt-5">
          <Box>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h4">
                  Questions {questionIndex + 1}
                </Typography>
                <Typography mt={5}>
                  {decode(response.results[questionIndex].question)}
                </Typography>
              </CardContent>
            </Card>

            {options.map((data, id) => (
              <Box mt={2} key={id}>
                {/* <Card className={classes.root} variant="outlined">
                  <CardContent> */}
                <Row className="justify-content-center">
                  <Button
                    id="btn"
                    onClick={handleClickAnswer}
                    variant="contained"
                  >
                    {decode(data)}
                  </Button>
                </Row>
                {/* </CardContent>
                </Card> */}
              </Box>
            ))}

            <Box mt={5}>
              Score: {score} / {response.results.length}
            </Box>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default Questions;
