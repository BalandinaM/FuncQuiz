/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import SelectCategory from "../selectCategory/selectCategory";
import SelectTime from "../selectTime/selectTime";
import styles from "./gameContainer.module.css";
import { useState, useEffect, useRef } from "react";
import { setStudiedQuestions } from "../forStorage";

const GameContainer = ({
	setShowGameScreen,
	setUnstudiedQuestions,
	setGameTime,
	setCounterQuestions,
}) => {
	const questions = useSelector((state) => state.questionsGame);
	const questionCategories = Object.keys(questions);
	const [selectedCategory, setSelectedCategory] = useState("arrays");
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [inputValue, setInputValue] = useState("");
	const isDisabled = currentQuestion === null; //состояние для инпута и кнопки пока игра не началась
	const counterShowQuestionsRef = useRef(0);
	const [inputClass, setInputClass] = useState(styles.input);
	const arrayStudiedQuestionsRef = useRef([]);
	const arrayUnstudiedQuestionsRef = useRef([]);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [timeLeft, setTimeLeft] = useState(60); // время в секундах
	const gameTime = ["1 минута", "2 минуты", "3 минуты"];
	const [selectedTime, setSelectedTime] = useState("1 минута");

	const getRandomIndex = (array) => {
		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	};

	function removeDuplicates(arr, key = "id") {
		if (!Array.isArray(arr)) {
			console.error("Первый аргумент должен быть массивом");
			return [];
		}

		return [...new Map(arr.map((item) => [item[key], item])).values()];
	}

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			if (!inputValue.trim()) return;
			if (inputValue.trim() === currentQuestion.answer) {
				arrayStudiedQuestionsRef.current.push(currentQuestion);
				setInputClass(styles.input_correct);
				counterShowQuestionsRef.current += 1;
			} else {
				console.log("error!!!!");
				const questionWithUserAnswer = {
					...currentQuestion,
					userAnswer: inputValue.trim(),
				};
				arrayUnstudiedQuestionsRef.current.push(questionWithUserAnswer);
				setInputClass(styles.input_error);
				counterShowQuestionsRef.current += 1;
			}

			setTimeout(() => {
				setInputClass(styles.input);
				setInputValue("");
				setCurrentQuestion(
					getRandomIndex(questions[selectedCategory].filter((item) => item.isLearn === false))
				);
			}, 400);
		}
	};

	const startGame = () => {
		setIsGameStarted(true);
		setCurrentQuestion(
			getRandomIndex(questions[selectedCategory].filter((item) => item.isLearn === false))
		);
	};

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
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);
		}
		return () => clearInterval(timerId);
	}, [isGameStarted, timeLeft]);

	useEffect(() => {
		if (timeLeft === 0 && isGameStarted === false) {
			setUnstudiedQuestions(removeDuplicates(arrayUnstudiedQuestionsRef.current));
			setStudiedQuestions(removeDuplicates(arrayStudiedQuestionsRef.current), selectedCategory);
			setGameTime(selectedTime);
			setCounterQuestions(counterShowQuestionsRef.current);
			setShowGameScreen(false);
		}
	}, [
		timeLeft,
		isGameStarted,
		setShowGameScreen,
		setUnstudiedQuestions,
		setGameTime,
		setCounterQuestions,
		selectedTime,
		selectedCategory,
	]);

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

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
	};

	return (
		<>
			<SelectCategory
				questionCategories={questionCategories}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>
			<SelectTime
				selectedTime={selectedTime}
				handleSelectedTime={handleSelectedTime}
				optionsGameTime={optionsGameTime}
			/>
			<button className={styles.buttonPlay} onClick={startGame} disabled={isGameStarted}>
				Начать
			</button>
			<div className={styles.wrap}>
				<div className={styles.timer}>{formatTime(timeLeft)}</div>
				<div className={styles.question}>
					{currentQuestion != null ? (
						<p>{currentQuestion.question}</p>
					) : (
						<p>Метод изменяет порядок элементов в массиве на обратный</p>
					)}
				</div>
				<input
					value={inputValue}
					className={inputClass}
					type="text"
					placeholder="Для отправки ответа нажмите Enter"
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					disabled={isDisabled}
				/>
			</div>
		</>
	);
};

export default GameContainer;
