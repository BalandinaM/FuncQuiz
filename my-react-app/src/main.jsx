import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import Root, { loader as rootLoader, action as rootAction } from './root/root';
import { store } from './app/store';
import { Provider } from 'react-redux';
import ErrorPage404 from './errorPage_404.jsx';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage404 />,
		loader: rootLoader,
		action: rootAction,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
