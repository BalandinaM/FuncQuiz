import SelectCategory from "../selectCategory/selectCategory";
import GameField from "../gameField/gameField";
import styles from './gameContainer.module.css';
import { useState } from "react";

const GameContainer = () => {
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [secondsTimer, setSecondsTimer] = useState(60);

	console.log(isGameStarted);
	// let i = 0;
	// let timerId = setInterval(() => {
	// 	console.log(++i);

	// 	if(i >= 60) {
	// 		clearInterval(timerId)
	// 	}
	// }, 1000);

	// if (isGameStarted) {

	// }

	const startGame = () => {
		setIsGameStarted(true);
		console.log("игра началась!");
		let i = secondsTimer;
		let timerId = setInterval(() => {
			setSecondsTimer(--i);
			if (i === 0) {
				clearInterval(timerId);
			}
		}, 1000);
	};
	//написать функцию для таймера
	//наверное понадобится useEffect следящий за состоянием isGameStarted
	//взможно утром тебе покажется что зря разбила на кучу компонентов так как придется кучу всего передавать через пропсы, но
	//компоненты должны быть тупенькими, они ни чего не должны занть что происходит,
	//они отрисовывают контент

	return (
		<>
			<SelectCategory />
			<div>
				Время игры:
				<select className={styles.select}>
					<option>1 минута</option>
					<option>2 минуты</option>
					<option>3 минуты</option>
				</select>
			</div>
			<button className={styles.buttonPlay} onClick={() => startGame()} disabled={isGameStarted}>
				Начать
			</button>
			{/* <GameField /> */}
			<div className={styles.wrap}>
				{/* <div className={styles.timer}>00:00:00</div> */}
				<div className={styles.timer}>{secondsTimer}</div>
				<div className={styles.question}>
					<p>Метод изменяет порядок элементов в массиве на обратный</p>
				</div>
				<input className={styles.input} type="text" placeholder="reverse()" />
			</div>
		</>
	);
};

export default GameContainer;
