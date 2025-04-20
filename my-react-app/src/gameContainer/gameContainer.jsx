/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import SelectCategory from "../selectCategory/selectCategory";
import SelectTime from "../selectTime/selectTime";
import styles from "./gameContainer.module.css";
import { useState, useEffect, useRef } from "react";
import { addStudiedQuestions } from "../forStorage";
import ModalBox from "../modalBox/modalBox";

export function removeDuplicates(arr, key = "id") {
	if (!Array.isArray(arr)) {
		console.error("Первый аргумент должен быть массивом");
		return [];
	}

	return [...new Map(arr.map((item) => [item[key], item])).values()];
}

const GameContainer = ({
	studiedQuestionsFromStorage,
	setShowGameScreen,
	setUnstudiedQuestions,
	setGameTime,
	setCounterQuestions,
}) => {
	const questionsFromState = useSelector((state) => state.questionsGame);
	const [questions, setQuestions] = useState(() => {
		if (studiedQuestionsFromStorage.length === 0) return questionsFromState;

		return questionsFromState.map(item => {
			const update = studiedQuestionsFromStorage.find(u => u.id === item.id);
			return update ? { ...item, ...update } : item;
		});
	});
	const [selectedCategory, setSelectedCategory] = useState("all");
	//const [isLearnedCategory, setIsLearnedCategory] = useState(false);
	const [showModalSave, setShowModalSave] = useState(false);
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

	const getQuestion = (selectedCategory) => {
		if (selectedCategory == 'all') {
			return getRandomIndex(questions.filter((item) => item.isLearn === false))
		} else {
			return getRandomIndex((questions.filter((item) => item.category === selectedCategory)).filter((item) => item.isLearn === false))
		}
	};

	const handleChangeSelect = (event) => {//проверка на то что массив выбранной категории не пустой
		if (
			questions
				.filter((item) => item.category === event.target.value)
				.filter((item) => item.isLearn === false).length != 0
		) {
			console.log("элементы есть!");
			setSelectedCategory(event.target.value);
		} else {
			//setIsLearnedCategory(true);
			console.log("ПУСТО!");
			setShowModalSave(true);
		}
	};

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
				setCurrentQuestion(getQuestion(selectedCategory));
			}, 400);
		}
	};

	const startGame = () => {
		setIsGameStarted(true);
		setCurrentQuestion(getQuestion(selectedCategory));
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
			addStudiedQuestions(removeDuplicates(arrayStudiedQuestionsRef.current));
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
				questions={questions}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				handleChangeSelect={handleChangeSelect}
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
						<p className={styles.blurredText}>FuncQuiz. Тренировка знаний JavaScript функций.</p>
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
			{showModalSave && (
				<ModalBox
					message="Вы знаете все функции в этой категории! Пожалуйста, выберите другую!"
					duration={3000}
					onClose={() => setShowModalSave(false)}
				/>
			)}
		</>
	);
};

export default GameContainer;
