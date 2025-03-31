import styles from './footer.module.css';
//import NavLink from 'react-router-dom';
import { NavLink } from "react-router-dom";
const Footer = () => {
 return (
	<div className={styles.container}>
		<span className={styles.copyright}>
			{/* <NavLink to="https://t.me/Balandina_MS">Сopyright by Marina Balandina</NavLink> */}
			Сopyright by Marina Balandina
		</span>
	</div>
 )
}

export default Footer
