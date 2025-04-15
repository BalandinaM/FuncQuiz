/* eslint-disable react/prop-types */
import styles from './showResultGame.module.css'


const ShowResultGame = ({unstudiedQuestions, gameTime, counterQuestions}) => {
	//проработать разворачивание неверных ответов по клику на надпись(стили не забудь добавить)
	//обработчики на кнопки повторить и сбросить результаты
	//сохранение результатов в локальный стейт (это в gameContainer надо делать)

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
					<p>Время: <span>{gameTime}</span></p>
					<p>Количество вопросов: <span>{counterQuestions}</span></p>
					<p>Неверных ответов: <span>{unstudiedQuestions.length}</span></p>
					<button className={styles.buttonStatistics}>Развернуть описание ошибочных ответов</button>
				</div>
				<div className={styles.errorWrap}>
					{errorAnswers}
				</div>
				<div className={styles.buttonWrap}>
					<button>Повторить</button>
					<button className={styles.buttonReset}>Сбросить результаты</button>
				</div>
			</div>
		</div>
	)
}

export default ShowResultGame;
