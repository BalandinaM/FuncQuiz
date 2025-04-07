import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import Root from './root/root';
import { store } from './app/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
			<Root />
		</Provider>
  </StrictMode>,
)
