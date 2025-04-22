// import AboutGame from '../aboutGame/aboutGame';
// import Footer from '../footer/footer';
// import GameContainer from '../gameContainer/gameContainer';
// import Header from '../header/header';
// import ShowResultGame from '../showResultGame/showResultGame';
// import styles from './root.module.css';
// import { useState } from 'react';
// import { getStudiedQuestions, setStudiedQuestions } from '../forStorage';
// import { useLoaderData } from 'react-router-dom';

// export async function loader() {
// 	const studiedQuestionsFromStorage = await getStudiedQuestions();
// 	return { studiedQuestionsFromStorage };
// }

// export async function action() {
// 	const studiedQuestions = await setStudiedQuestions();
// 	return { studiedQuestions };
// }

// const Root = () => {
// 	const { studiedQuestionsFromStorage } = useLoaderData();
// 	console.log(studiedQuestionsFromStorage);

// 	const [showGameScreen, setShowGameScreen] = useState(true);
// 	const [unstudiedQuestions, setUnstudiedQuestions] = useState();
// 	const [gameTime, setGameTime] = useState();
// 	const [counterQuestions, setCounterQuestions] = useState();


//   return (
// 		<div className={styles.pageContainer}>
// 			<Header />
// 			<div className={styles.wrapContent}>
// 				<AboutGame />
// 				{showGameScreen ? (
// 					<GameContainer
// 						studiedQuestionsFromStorage={studiedQuestionsFromStorage}
// 						setShowGameScreen={setShowGameScreen}
// 						setUnstudiedQuestions={setUnstudiedQuestions}
// 						setGameTime={setGameTime}
// 						setCounterQuestions={setCounterQuestions}
// 					/>
// 				) : (
// 					<ShowResultGame
// 						unstudiedQuestions={unstudiedQuestions}
// 						gameTime={gameTime}
// 						counterQuestions={counterQuestions}
// 					/>
// 				)}
// 			</div>
// 			<Footer />
// 		</div>
// 	);
// }

// export default Root;

// import AboutGame from '../aboutGame/aboutGame';
// import Footer from '../footer/footer';
// import GameContainer from '../gameContainer/gameContainer';
// import Header from '../header/header';
// import ShowResultGame from '../showResultGame/showResultGame';
// import styles from './root.module.css';
// import { useState, useEffect } from 'react';
// import { getStudiedQuestions, setStudiedQuestions } from '../forStorage';
// import { useLoaderData } from 'react-router-dom';

// export async function loader() {
//     const studiedQuestionsFromStorage = await getStudiedQuestions();
//     return { studiedQuestionsFromStorage };
// }

// export async function action() {
//     const studiedQuestions = await setStudiedQuestions();
//     return { studiedQuestions };
// }

// const Root = () => {
//     const { studiedQuestionsFromStorage: initialStudiedQuestions } = useLoaderData();
//     const [studiedQuestions, setStudiedQuestions] = useState(initialStudiedQuestions);
//     const [showGameScreen, setShowGameScreen] = useState(true);
//     const [unstudiedQuestions, setUnstudiedQuestions] = useState();
//     const [gameTime, setGameTime] = useState();
//     const [counterQuestions, setCounterQuestions] = useState();

//     // Эффект для загрузки данных при изменении showGameScreen
//     useEffect(() => {
//         async function loadStudiedQuestions() {
//             const updatedQuestions = await getStudiedQuestions();
//             setStudiedQuestions(updatedQuestions);
//         }

//         loadStudiedQuestions();
//     }, [showGameScreen]);

//     return (
//         <div className={styles.pageContainer}>
//             <Header />
//             <div className={styles.wrapContent}>
//                 <AboutGame />
//                 {showGameScreen ? (
//                     <GameContainer
//                         studiedQuestionsFromStorage={studiedQuestions}
//                         setShowGameScreen={setShowGameScreen}
//                         setUnstudiedQuestions={setUnstudiedQuestions}
//                         setGameTime={setGameTime}
//                         setCounterQuestions={setCounterQuestions}
//                     />
//                 ) : (
//                     <ShowResultGame
//                         unstudiedQuestions={unstudiedQuestions}
//                         gameTime={gameTime}
//                         counterQuestions={counterQuestions}
// 												setShowGameScreen={setShowGameScreen}
//                     />
//                 )}
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default Root;

import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import AboutGame from '../aboutGame/aboutGame';
import Footer from '../footer/footer';
import GameContainer from '../gameContainer/gameContainer';
import Header from '../header/header';
import ShowResultGame from '../showResultGame/showResultGame';
import styles from './root.module.css';
import { getStudiedQuestions, setStudiedQuestions, resetProgress} from '../forStorage';
import Loader from '../loader/loader';

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
    const [studiedQuestions, setStudiedQuestionsState] = useState(studiedQuestionsFromStorage);
    const [showGameScreen, setShowGameScreen] = useState(true);
    const [unstudiedQuestions, setUnstudiedQuestions] = useState();
    const [gameTime, setGameTime] = useState();
    const [counterQuestions, setCounterQuestions] = useState();
		const [resetTrigger, setResetTrigger] = useState(0); // Триггер для сброса
		const [isLoading, setIsLoading] = useState(false);

    // Эффект для загрузки данных при изменении showGameScreen
		useEffect(() => {
			async function loadStudiedQuestions() {
					setIsLoading(true);
					try {
							const updatedQuestions = await getStudiedQuestions();
							console.log('Загруженные данные:', updatedQuestions); // Для отладки
							setStudiedQuestionsState(updatedQuestions);
					} catch (error) {
							console.error('Ошибка загрузки:', error);
					} finally {
							setIsLoading(false);
					}
			}

			loadStudiedQuestions();
	}, [showGameScreen, resetTrigger]);

	// Функция сброса прогресса
	async function handleResetResult() {
			setIsLoading(true);
			try {
					await resetProgress();

					// 1. Сразу обновляем локальное состояние
					setStudiedQuestionsState([]);

					// 2. Сбрасываем другие состояния
					setUnstudiedQuestions(undefined);
					setGameTime(undefined);
					setCounterQuestions(undefined);

					// 3. Форсируем перезагрузку данных
					setResetTrigger(prev => prev + 1);

					console.log('Прогресс сброшен, текущее состояние:', await getStudiedQuestions());
			} catch (error) {
					console.error('Ошибка сброса:', error);
			} finally {
					setIsLoading(false);
			}
	}

    return (
        <div className={styles.pageContainer}>
						{isLoading && <Loader />}
						{/* <Loader /> */}
            <Header />
            <div className={styles.wrapContent}>
                <AboutGame />
                {showGameScreen ? (
                    <GameContainer
                        studiedQuestionsFromStorage={studiedQuestions}
                        setShowGameScreen={setShowGameScreen}
                        setUnstudiedQuestions={setUnstudiedQuestions}
                        setGameTime={setGameTime}
                        setCounterQuestions={setCounterQuestions}
												handleResetResult={handleResetResult}
                    />
                ) : (
                    <ShowResultGame
                        unstudiedQuestions={unstudiedQuestions}
                        gameTime={gameTime}
                        counterQuestions={counterQuestions}
                        setShowGameScreen={setShowGameScreen}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Root;
