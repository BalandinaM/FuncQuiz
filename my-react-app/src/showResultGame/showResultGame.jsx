/* eslint-disable react/prop-types */
import styles from "./showResultGame.module.css";
import { useState } from "react";

const ShowResultGame = ({ unstudiedQuestions, gameTime, counterQuestions }) => {
	//обработчики на кнопки повторить и сбросить результаты
	//сохранение результатов в локальный стейт (это в gameContainer надо делать)
	const [isShowErrors, setIsShowErrors] = useState(false);

	const errorAnswers = unstudiedQuestions.map((item) => {
		return (
			<div className={styles.error} key={item.id}>
				<p>
					Вопрос:<span>{item.question}</span>
				</p>
				<p>
					<span>Ответ: {item.answer};</span>
				</p>
				<p className={styles.errorText}>
					<span>Твой ответ: {item.userAnswer}</span>
				</p>
			</div>
		);
	});

	return (
		<div>
			<h2 className={styles.title}>Результаты</h2>
			<div className={styles.wrap}>
				<div className={styles.statistics}>
					<p>
						Время: <span>{gameTime}</span>
					</p>
					<p>
						Количество вопросов: <span>{counterQuestions}</span>
					</p>
					<p>
						Неверных ответов: <span>{unstudiedQuestions.length}</span>
					</p>
					<button
						className={styles.buttonStatistics}
						onClick={() => setIsShowErrors(!isShowErrors)}
					>
						{isShowErrors ? "Свернуть" : "Развернуть описание ошибочных ответов"}
					</button>
				</div>
				{isShowErrors ? <div className={styles.errorWrap}>{errorAnswers}</div> : null}

				<div className={styles.buttonWrap}>
					<button>Повторить</button>
					<button className={styles.buttonReset}>Сбросить результаты</button>
				</div>
			</div>
		</div>
	);
};

export default ShowResultGame;
