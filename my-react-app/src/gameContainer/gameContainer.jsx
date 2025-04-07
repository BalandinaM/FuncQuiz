import { useSelector } from "react-redux";
import SelectCategory from "../selectCategory/selectCategory";
import SelectTime from "../selectTime/selectTime";
//import GameField from "../gameField/gameField";
import styles from "./gameContainer.module.css";
import { useState, useEffect } from "react";

//написать функцию для таймера
//наверное понадобится useEffect следящий за состоянием isGameStarted
//взможно утром тебе покажется что зря разбила на кучу компонентов так как придется кучу всего передавать через пропсы, но
//компоненты должны быть тупенькими, они ни чего не должны занть что происходит,
//они отрисовывают контент

const GameContainer = ({setShowGameScreen}) => {
	const questions = useSelector((state) => state.questionsGame);
	console.log(Object.keys(questions));

	//код выше вероятно стоит перенести в компонент отвечающий за выбор категории,
	//и чтобы этот компонент через состояние передавал сюда значение в селекте
	//и уже тут будем искать нужный массив фильтровать и выводить на экран


	const [isGameStarted, setIsGameStarted] = useState(false);
	const [timeLeft, setTimeLeft] = useState(60); // время в секундах
	const gameTime = ["1 минута", "2 минуты", "3 минуты"];
	const [selectedTime, setSelectedTime] = useState("1 минута");

	const optionsGameTime = gameTime.map((text, index) => {
		return <option key={index}>{text}</option>;
	});

	useEffect(() => {
		let timerId;
		if (isGameStarted && timeLeft > 0) {
			timerId = setInterval(() => {
				setTimeLeft((prevTime) => {
					if (prevTime <= 1) {
						clearInterval(timerId);
						setIsGameStarted(false);
						setShowGameScreen(false);
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);
		}
		return () => clearInterval(timerId);
	}, [isGameStarted, timeLeft, setShowGameScreen]);

	const handleSelectedTime = (event) => {
		setSelectedTime(event.target.value);
		switch (event.target.value) {
			case "1 минута":
				setTimeLeft(60);
				break;
			case "2 минуты":
				setTimeLeft(120);
				break;
			case "3 минуты":
				setTimeLeft(180);
				break;
			default:
				setTimeLeft(60);
		}
	};

	const startGame = () => {
		setIsGameStarted(true);
	};

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
	};

	return (
		<>
			<SelectCategory />
			<SelectTime
				selectedTime={selectedTime}
				handleSelectedTime={handleSelectedTime}
				optionsGameTime={optionsGameTime}
			/>
			<button
				className={styles.buttonPlay}
				onClick={startGame}
				disabled={isGameStarted}
			>
				Начать
			</button>
			<div className={styles.wrap}>
				<div className={styles.timer}>{formatTime(timeLeft)}</div>
				<div className={styles.question}>
					<p>Метод изменяет порядок элементов в массиве на обратный</p>
				</div>
				<input className={styles.input} type="text" placeholder="reverse()" />
			</div>
		</>
	);
};

export default GameContainer;
