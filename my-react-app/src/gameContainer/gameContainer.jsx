/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import SelectCategory from "../selectCategory/selectCategory";
import SelectTime from "../selectTime/selectTime";
import styles from "./gameContainer.module.css";
import { useState, useEffect, useRef } from "react";
import { addStudiedQuestions } from "../forStorage";
import ModalBox from "../modalBox/modalBox";
import { removeDuplicates } from "../assests/util";
import { mergeQuestions, getRandomIndex, getQuestion } from "./gameUtils";

const GameContainer = ({
	studiedQuestionsFromStorage,
	setShowGameScreen,
	setUnstudiedQuestions,
	setGameTime,
	setCounterQuestions,
	handleResetResult
}) => {
	const questionsFromState = useSelector((state) => state.questionsGame);//получаем массив вопросов из стора
	const [questions, setQuestions] = useState(
    () => mergeQuestions(questionsFromState, studiedQuestionsFromStorage)
  );
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [showMessage, setShowMessage] = useState(false);
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

	useEffect(() => {
    setQuestions(mergeQuestions(questionsFromState, studiedQuestionsFromStorage));
  }, [studiedQuestionsFromStorage, questionsFromState]);

	const handleChangeSelect = (event) => {
	//проверка на то что массив выбранной категории не пустой
		if (
			questions
				.filter((item) => item.category === event.target.value)
				.filter((item) => item.isLearn === false).length != 0
		) {
			setSelectedCategory(event.target.value);
		} else if (event.target.value == "all") {
			questions.filter((item) => item.isLearn === false);
			setSelectedCategory(event.target.value);
		} else {
			setShowMessage(true);
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
				setCurrentQuestion(getQuestion(selectedCategory,questions));
			}, 400);
		}
	};

	const startGame = () => {
		setIsGameStarted(true);
		setCurrentQuestion(getQuestion(selectedCategory, questions));
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
				isGameStarted={isGameStarted}
			/>
			<SelectTime
				selectedTime={selectedTime}
				handleSelectedTime={handleSelectedTime}
				optionsGameTime={optionsGameTime}
				isGameStarted={isGameStarted}
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
			<button className={styles.buttonReset} onClick={() => handleResetResult()} disabled={isGameStarted}>Сбросить результаты</button>
			{showMessage && (
				<ModalBox
					message="Вы знаете все функции в этой категории! Пожалуйста, выберите другую!"
					duration={3000}
					onClose={() => setShowMessage(false)}
				/>
			)}
		</>
	);
};

export default GameContainer;
