import React from 'react';
import ReactDOM from 'react-dom/client';

import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import './styles/App.css';

import App from './pages/App';
import Quiz from './pages/Quiz';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/quiz" element={<Quiz />} />
			</Routes>
		</Router>
	</React.StrictMode>
);
