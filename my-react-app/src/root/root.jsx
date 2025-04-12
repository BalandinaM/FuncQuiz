import AboutGame from '../aboutGame/aboutGame';
import Footer from '../footer/footer';
import GameContainer from '../gameContainer/gameContainer';
import Header from '../header/header';
import ShowResultGame from '../showResultGame/showResultGame';
import styles from './root.module.css';
import { useState } from 'react';

const Root = () => {
	const [showGameScreen, setShowGameScreen] = useState(true);//когда таймер дотикает надо будет менять на false
	const [unstudiedQuestions, setUnstudiedQuestions] = useState();


  return (
    <div className={styles.pageContainer}>
      <Header/>
			<div className={styles.wrapContent}>
				<AboutGame />
				{showGameScreen ?
					<GameContainer setShowGameScreen={setShowGameScreen} setUnstudiedQuestions={setUnstudiedQuestions}/> :
					<ShowResultGame unstudiedQuestions={unstudiedQuestions}/>
				}
			</div>
			<Footer/>
    </div>
  )
}

export default Root;
