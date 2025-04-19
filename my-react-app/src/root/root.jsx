import AboutGame from '../aboutGame/aboutGame';
import Footer from '../footer/footer';
import GameContainer from '../gameContainer/gameContainer';
import Header from '../header/header';
import ShowResultGame from '../showResultGame/showResultGame';
import styles from './root.module.css';
import { useState } from 'react';
import { getStudiedQuestions, setStudiedQuestions } from '../forStorage';
import { useLoaderData } from 'react-router-dom';

export async function loader() {
	const studiedQuestionsFromStorage = await getStudiedQuestions();
	return { studiedQuestionsFromStorage };
}

export async function action() {
	const studiedQuestions = await setStudiedQuestions();
	return { studiedQuestions };
}

const Root = () => {
	const { studiedQuestionsFromStorage } = useLoaderData();
	console.log(studiedQuestionsFromStorage);

	const [showGameScreen, setShowGameScreen] = useState(true);
	const [unstudiedQuestions, setUnstudiedQuestions] = useState();
	const [gameTime, setGameTime] = useState();
	const [counterQuestions, setCounterQuestions] = useState();


  return (
		<div className={styles.pageContainer}>
			<Header />
			<div className={styles.wrapContent}>
				<AboutGame />
				{showGameScreen ? (
					<GameContainer
						studiedQuestionsFromStorage={studiedQuestionsFromStorage}
						setShowGameScreen={setShowGameScreen}
						setUnstudiedQuestions={setUnstudiedQuestions}
						setGameTime={setGameTime}
						setCounterQuestions={setCounterQuestions}
					/>
				) : (
					<ShowResultGame
						unstudiedQuestions={unstudiedQuestions}
						gameTime={gameTime}
						counterQuestions={counterQuestions}
					/>
				)}
			</div>
			<Footer />
		</div>
	);
}

export default Root;
