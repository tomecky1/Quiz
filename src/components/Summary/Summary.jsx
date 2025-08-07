import styles from "./Summary.module.css";

export function Summary(props) {
  const { questions = [], userAnswers = [], correctAnswers = [] } = props;
  console.log(props);

  return (
    <div className={styles.summary}>
      <h2>Podsumowanie</h2>
      {questions.map((question, idx) => {
        const userAnswer = userAnswers[idx]?.answer;
        const correctAnswer = correctAnswers[idx];
        const isCorrect = userAnswer === correctAnswer;

        return (
          <div key={idx} className={styles.results}>
            <p>
              Pytanie {idx + 1}:{" "}
              <span>{question.text || question.question || question}</span>
            </p>
            <p>
              Twoja odpowiedź:{" "}
              <span className={!isCorrect ? styles.incorrect : styles.correct}>
                {userAnswer}
              </span>
            </p>
            <p>
              Poprawna odpowiedź:{" "}
              <span className={styles.correct}>{correctAnswer}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
