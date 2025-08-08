import styles from "./loader.module.css";

const Loader = () => (
	<div className={styles.overlay}>
		<div className={styles.loader}></div>
	</div>
);

export default Loader;
