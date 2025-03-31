import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './root.module.css'

function Root() {

  return (
    <div className={styles.pageContainer}>
      <Header/>
			<div className={styles.wrapContent}>
				<p>тут основное содерижимое</p>
			</div>
			<Footer/>
    </div>
  )
}

export default Root;
