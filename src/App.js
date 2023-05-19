import { useNavigate } from "react-router-dom";
import "./App.css";
import ThemeSwitch from "./components/ThemeSwitch";
import { useSelector } from "react-redux";
export default function App() {
  const navigate = useNavigate();
  const theme = useSelector((store) => store.theme.currentTheme);

  return (
    <div className={`home-container ${theme}-home-container ${theme}`}>
      <ThemeSwitch />
      <div className="welcome-window">
        <h1>Welcome to Quiz!</h1>
        <h2> presented with 3 MCQs.</h2>
        <p>Can you score 100% ?</p>
        <button
          onClick={() => {
            navigate("/quiz");
          }}
        >
          Start challenge!
        </button>
      </div>
    </div>
  );
}
