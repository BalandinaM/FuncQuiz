import styles from './header.module.css';

const Header = () => {
	return (
		<div className={styles.container}>
			<div className={styles.logoWrap}>
				<span className={styles.logo}>FuncQuiz</span>
				<span className={styles.slogan}>Тренировка знаний JS-функций</span>
			</div>
		</div>
	)
}

export default Header;
