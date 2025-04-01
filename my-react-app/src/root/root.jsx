import AboutGame from '../aboutGame/aboutGame';
import Footer from '../footer/footer';
import GameField from '../gameField/gameField';
import Header from '../header/header';
import SelectCategory from '../selectCategory/selectCategory';
import styles from './root.module.css'

function Root() {

  return (
    <div className={styles.pageContainer}>
      <Header/>
			<div className={styles.wrapContent}>
				<AboutGame />
				<SelectCategory/>
				<button>Начать игру!</button>
				<GameField />
			</div>
			<Footer/>
    </div>
  )
}

export default Root;
