import { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../context/QuizContext";

function App() {
  const {
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    dispatch,
    totalPoints,
    questions,
  } = useQuiz();

  useEffect(
    function () {
      async function mount() {
        try {
          const res = await fetch("http://localhost:8000/questions");
          const data = await res.json();
          dispatch({ type: "dataReceived", payload: data });
        } catch (err) {
          dispatch({ type: "dataFailed" });
        }
      }

      mount();
    },
    [dispatch],
  );
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
