import AboutGame from '../aboutGame/aboutGame';
import Footer from '../footer/footer';
import GameContainer from '../gameContainer/gameContainer';
import Header from '../header/header';
import ResultGame from '../resultGame/resultGame';
import styles from './root.module.css'

function Root() {

  return (
    <div className={styles.pageContainer}>
      <Header/>
			<div className={styles.wrapContent}>
				<AboutGame />
				{/* <GameContainer /> */}
				<ResultGame />
			</div>
			<Footer/>
    </div>
  )
}

export default Root;
