import styles from './gameField.module.css';

const GameField = () => {
	return (
		<div className={styles.wrap}>
			<div className={styles.timer}>00:00:00</div>
			<div className={styles.question}><p>Метод изменяет порядок элементов в массиве на обратный</p></div>
			<input className={styles.input} type="text" placeholder='reverse()'/>
		</div>
	)
}

export default GameField;
