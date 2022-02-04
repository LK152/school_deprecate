import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import Results from './components/Results';
import Navbar from './components/Navbar';
import Edit from './components/Edit';
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';
import PageNotAuthorized from './components/PageNotAuthorized';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Developer from './components/Developer';
import MobileNavbar from './mobile/components/MobileNavbar';
import { useModalContext } from './context/ModalContext';
import lsshStar from './images/lsshStar.png';
import useViewport from './hooks/useViewport';

const App = () => {
	const { info, authState } = useModalContext();
	const { isAdmin, isUser } = authState;
	const { width } = useViewport();
	const breakpoint = 441;

	return (
		<Router>
			<div className='minHeight'>
				{width > breakpoint ? <Navbar /> : <MobileNavbar />}
				{width > 880 ? (
					<img
						alt='lssh-star'
						src={lsshStar}
						style={{
							position: 'fixed',
							bottom: '10%',
							left: '50%',
							transform: 'translateX(-50%)',
							zIndex: -1,
						}}
					/>
				) : width > 630 ? (
					<img
						alt='lssh-star'
						src={lsshStar}
						style={{
							width: 500,
							position: 'fixed',
							bottom: '20%',
							left: '50%',
							transform: 'translateX(-50%)',
							zIndex: -1,
						}}
					/>
				) : (
					<img
						alt='lssh-star'
						src={lsshStar}
						style={{
							width: 300,
							position: 'fixed',
							bottom: '20%',
							left: '50%',
							transform: 'translateX(-50%)',
							zIndex: -1,
						}}
					/>
				)}
				<Routes>
					<Route exact path='*' element={<PageNotFound />} />
					<Route exact path='/' element={<Home />} />
					<Route exact path='/developer' element={<Developer />} />
					<Route
						path='/self-learning-form'
						element={info ? <Form /> : <Home />}
					/>
					<Route
						path='/self-learning-results'
						element={info ? <Results /> : <Home />}
					/>
					<Route
						path='/self-learning-edit'
						element={info ? <Edit /> : <Home />}
					/>
					<Route
						path='/dashboard'
						element={
							isUser || isAdmin ? (
								<Dashboard />
							) : (
								<PageNotAuthorized />
							)
						}
					/>
					<Route
						path='/users'
						element={
							isAdmin && !isUser ? (
								<Users />
							) : (
								<PageNotAuthorized />
							)
						}
					/>
				</Routes>
			</div>
			<Footer />
		</Router>
	);
};

export default App;
