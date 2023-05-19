import { useEffect, useState } from "react";
import { quiz } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import { useSelector } from "react-redux";
const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQue, setCurrentQue] = useState(1);
  const [selectedChoice, setSelectedChoice] = useState([]);
  const [timer, setTimer] = useState(60);
  const theme = useSelector((store) => store.theme.currentTheme);

  const handleSelectChoice = (choice) => {
    const oldArray = [...selectedChoice];
    oldArray[currentQue - 1] = choice;
    setSelectedChoice(oldArray);
    localStorage.setItem("selected_choices", JSON.stringify(oldArray));
  };
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        navigate("/result");
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });
  return (
    <div className={`${theme} quiz-main-container`}>
      <ThemeSwitch />
      <div className="quiz-container">
        <p className="timer">Time left {timer}s</p>
        <div className="">
          <h1>{quiz[currentQue - 1].question}</h1>
          <div>
            {quiz[currentQue - 1].choices.map((choice, i) => {
              return (
                <button
                  className={`choice ${
                    selectedChoice[currentQue - 1] === choice && "selected"
                  }`}
                  onClick={() => handleSelectChoice(choice)}
                  key={i}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          <div className="footer">
            <button
              disabled={currentQue === 1}
              onClick={() => setCurrentQue(currentQue - 1)}
            >
              Back
            </button>
            {selectedChoice.length === quiz.length && (
              <button
                onClick={() => {
                  navigate("/result");
                }}
              >
                Submit
              </button>
            )}
            {currentQue !== quiz.length && (
              <button
                disabled={
                  selectedChoice[currentQue - 1] === undefined ||
                  currentQue === quiz.length
                }
                onClick={() => setCurrentQue(currentQue + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
        {selectedChoice.length > 0 && (
          <div className="review-ans">
            <h2>Review Answers</h2>
            <div className="answers">
              {selectedChoice.map((item, i) => {
                return (
                  <div key={i}>
                    <button
                      onClick={() => {
                        setCurrentQue(i + 1);
                      }}
                    >
                      {item}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
