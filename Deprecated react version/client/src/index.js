import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import ModalProvider from './context/ModalContext';

let defaultTheme = createTheme({
	palette: {
		primary: {
			main: '#F3905F',
		}, 
		secondary: {
			main: '#FFF',
		}
	}
});
const Theme = responsiveFontSizes(defaultTheme);

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={Theme}>
			<ModalProvider>
				<App />
			</ModalProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
