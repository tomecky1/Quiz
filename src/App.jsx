import { useState } from "react";
import styles from "./App.module.css";
import { Summary } from "./components/Summary/Summary";

const questions = [
  "Co oznacza skrót 'HTML'?",
  "Które z poniższych zwierząt jest ssakiem jajorodnym?",
  "Które miasto jest stolicą Polski?",
  "Który z podanych kolorów jest podstawowym kolorem tęczy?",
  "Który z poniższych wynalazków został wynaleziony przez Marię Skłodowską-Curię?",
];
const answers = [
  {
    id: 1,
    options: [
      { text: "Hypertext Markup Language", isCorrect: true },
      { text: "Hyper Transfer Markup Language", isCorrect: false },
      { text: "Home Tool Markup Language", isCorrect: false },
      { text: "Hyperlink Text Management Language", isCorrect: false },
    ],
  },
  {
    id: 2,
    options: [
      { text: "Orangutan", isCorrect: false },
      { text: "Krokodyl", isCorrect: false },
      { text: "Ornitorink", isCorrect: true },
      { text: "Żyrafa", isCorrect: false },
    ],
  },
  {
    id: 3,
    options: [
      { text: "Warszawa", isCorrect: true },
      { text: "Kraków", isCorrect: false },
      { text: "Gdańsk", isCorrect: false },
      { text: "Wrocław", isCorrect: false },
    ],
  },
  {
    id: 4,
    options: [
      { text: "Czerwony", isCorrect: true },
      { text: "Różowy", isCorrect: false },
      { text: "Brązowy", isCorrect: false },
      { text: "Szary", isCorrect: false },
    ],
  },
  {
    id: 5,
    options: [
      { text: "Promieniotwórczość", isCorrect: true },
      { text: "Telefon", isCorrect: false },
      { text: "Żarówka", isCorrect: false },
      { text: "Samochód", isCorrect: false },
    ],
  },
];
const correctAnswers = answers.map(
  (q) => q.options.find((opt) => opt.isCorrect).text
);
function App() {
  const [page, setPage] = useState(1);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Dodaj stan na odpowiedzi użytkownika
  const totalPages = questions.length;
  const isQuizEnd = page > questions.length;

  const currentQuestion = questions[page - 1];
  const currentAnswers = answers[page - 1]?.options;

  // Funkcja obsługująca kliknięcie w odpowiedź
  const handleAnswerClick = (isCorrect, selectedOption) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setUserAnswers((prev) => [
      ...prev,
      { question: currentQuestion, answer: selectedOption },
    ]);
    setPage((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      {isQuizEnd ? (
        <>
          <p>
            Twój wynik: {score} na {totalPages}
          </p>
          <Summary
            questions={questions}
            userAnswers={userAnswers}
            correctAnswers={correctAnswers}
          />
        </>
      ) : (
        <>
          <p>
            Pytanie {page} z {questions.length}
          </p>
          <p>{currentQuestion}</p>
          {currentAnswers.map((option, idx) => (
            <div key={idx}>
              <button
                className={styles.btn}
                onClick={() => handleAnswerClick(option.isCorrect, option.text)}
              >
                {option.text}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
