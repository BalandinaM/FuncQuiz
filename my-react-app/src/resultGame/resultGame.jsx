import styles from './resultGame.module.css'


const ResultGame = () => {
	return (
		<div>
			<h2 className={styles.title}>Результаты тренировки</h2>
			<div className={styles.wrap}>
				<div className={styles.statistics}>
					<p>Время: <span>00:01:00</span></p>
					<p>Количество вопросов: <span>8</span></p>
					<p>Неверных ответов: <span>1</span></p>
					<button className={styles.buttonStatistics}>Развернуть описание ошибочных ответов</button>
				</div>
				<div className={styles.errorWrap}>
					{/* подумать нужны ли тут спаны */}
					<div className={styles.error}>
						<p>Вопрос:<span>Метод изменяет порядок элементов в массиве на обратный.</span></p>
						<p><span>Ответ: reverse();</span></p>
						<p className={styles.errorText}><span>Твой ответ: revers();</span></p>
					</div>
					<div className={styles.error}>
						<p>Вопрос:<span>Метод изменяет порядок элементов в массиве на обратный.</span></p>
						<p><span>Ответ: reverse();</span></p>
						<p  className={styles.errorText}><span>Твой ответ: revers();</span></p>
					</div>
				</div>
				<div className={styles.buttonWrap}>
					<button>Повторить тренировку</button>
					<button className={styles.buttonReset}>Сбросить результаты</button>
				</div>
			</div>
		</div>
	)
}

export default ResultGame;
