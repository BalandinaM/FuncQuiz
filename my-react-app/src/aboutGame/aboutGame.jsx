import styles from './aboutGame.module.css';

const AboutGame = () => {
	return (
		<div className={styles.aboutWrap}>
			<h1 className={styles.title}>Знаешь JS? Докажи за минуту!</h1>
			<ul className={styles.list}>
				<li className={styles.item}><span className={styles.item_span}>Угадай функцию - Введи ответ - Проверь себя</span></li>
				<li className={styles.item}><span className={styles.item_span}>Случайные вопросы + таймер</span> на каждый раунд</li>
				<li className={styles.item}><span className={styles.item_span}>Жёсткие правила:</span> время вышло - игра окончена!</li>
			</ul>
		</div>
	)
}

export default AboutGame;
