import SelectCategory from "../selectCategory/selectCategory";
import GameField from "../gameField/gameField";
import styles from './gameContainer.module.css'

const GameContainer = () => {
	return (
		<>
			<SelectCategory />
			<button className={styles.buttonPlay}>Начать игру!</button>
			<GameField />
		</>
	);
};

export default GameContainer;
