import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    try {
      axios({
        method: "GET",
        url: "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&token=YOURTOKENHERE",
      }).then((res) => {
        setQuestions(res.data.results);
        console.log(res);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  return <div></div>;
}
