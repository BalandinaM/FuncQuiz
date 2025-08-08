import styles from "./footer.module.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
	return (
		<div className={styles.container}>
			<span>
				<NavLink to="https://t.me/Balandina_MS" className={styles.copyright}>Сopyright by Marina Balandina</NavLink>
			</span>
		</div>
	);
};

export default Footer;
