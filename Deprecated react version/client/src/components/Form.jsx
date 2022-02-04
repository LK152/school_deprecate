import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Card,
	Container,
	CircularProgress,
	CardContent,
	Grid,
	TextField,
	InputLabel,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormLabel,
	FormControl,
	styled,
	IconButton,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Send, DeleteOutline } from '@mui/icons-material';
import { mainTopics, subTopics, classes, numbers } from './Options';
import Select from './Select';
import Axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { initialValues, useModalContext } from '../context/ModalContext';
import '../App.css';

const Submitbtn = styled(LoadingButton)({
	border: '2px solid #F3905F',
	borderRadius: '5%',
	boxSizing: 'border-box',
	transition: '.5s ease-in-out',
	overflow: 'hidden',
	'&:before': {
		content: '""',
		borderRight: '50px solid transparent',
		borderTop: '40px solid #F3905F',
		transform: 'translateX(-100%)',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: -50,
		left: 0,
		transition: '.5s ease-in-out',
	},
	'&:hover': {
		color: '#FFF',
		'&:before': {
			transform: 'translateX(0)',
			transition: '.5s ease-in-out',
		},
	},
});

const Form = () => {
	const { values, setValues, info } = useModalContext();
	const [loading, setLoading] = useState(false);
	const {
		studentClass,
		number,
		studentName,
		mainTopic,
		subTopic,
		otherTopic,
		comment,
		memNum,
		mem1Class,
		mem1Num,
		mem2Class,
		mem2Num,
	} = values;
	const { uid, email } = info;

	const axios = rateLimit(Axios.create(), {
		maxRequests: 2,
		perMilliseconds: 1000,
		maxRPS: 2,
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const data = {
			uid: uid,
			email: email,
			studentClass: studentClass,
			number: number,
			studentName: studentName,
			topic: mainTopics[mainTopic].value,
			topicLabel: mainTopics[mainTopic].label,
			subTopic:
				mainTopic !== 7
					? subTopics[mainTopic][subTopic].value
					: otherTopic,
			subTopicLabel:
				mainTopic !== 7
					? subTopics[mainTopic][subTopic].label
					: otherTopic,
			comment: comment,
			memNum: memNum,
			mem1Class: mem1Class,
			mem1Num: mem1Num,
			mem2Class: mem2Class,
			mem2Num: mem2Num,
		};

		await axios
			.post(process.env.REACT_APP_API_URL + '/setDoc/' + uid, data)
			.catch((err) => console.log(err));

		navigate('/self-learning-results');
		handleDelete();
	};

	const handleDelete = () => {
		setValues(initialValues);
	};

	const renderMemberSelect = (num) => {
		let fields = [];
		for (var i = 1; i < num; i++) {
			fields.push(
				<Grid container key={i} spacing={1}>
					<Grid item xs>
						<FormControl fullWidth>
							<InputLabel>{'組員' + i + '班級'}</InputLabel>
							<Select
								label={'組員' + i + '班級'}
								name={'mem' + i + 'Class'}
								options={classes}
								value={
									i === 1
										? mem1Class
										: mem2Class
								}
								onChange={handleChange}
							/>
						</FormControl>
					</Grid>
					<Grid item xs>
						<FormControl fullWidth>
							<InputLabel>{'組員' + i + '座號'}</InputLabel>
							<Select
								label={'組員' + i + '座號'}
								name={'mem' + i + 'Num'}
								options={numbers}
								value={
									i === 1 ? mem1Num : mem2Num
								}
								onChange={handleChange}
							/>
						</FormControl>
					</Grid>
				</Grid>
			);
		}

		return (
			<Grid container direction='column' rowGap={1}>
				{fields}
			</Grid>
		);
	};

	const handleValidation = () => {
		if (studentClass === '' || number === '' || studentName === '') {
			return true;
		}
		if (
			memNum === '2' &&
			(mem1Class === '' || mem1Num === '')
		) {
			return true;
		} else if (
			memNum === '3' &&
			(mem1Class === '' ||
				mem1Num === '' ||
				mem2Class === '' ||
				mem2Num === '' ||
				(mem1Class === mem2Class &&
					mem1Num === mem2Num))
		) {
			return true;
		}
		if (
			mem1Class === studentClass &&
			mem1Num === number &&
			mem1Class !== '' &&
			mem1Num !== ''
		) {
			return true;
		}
		if (
			mem2Class === studentClass &&
			mem2Num === number &&
			mem2Class !== '' &&
			mem2Num !== ''
		) {
			return true;
		}
		if (mainTopic === '') {
			return true;
		} else if (mainTopic !== 7) {
			if (subTopic === '') {
				return true;
			}
		} else {
			if (otherTopic === '') {
				return true;
			} else {
				return false;
			}
		}
	};

	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<Grid container direction='column' rowGap={6}>
						<Grid item>
							<Typography variant='h2' align='center'>
								自主學習表單
							</Typography>
						</Grid>
						<form onSubmit={handleSubmit}>
							<Grid container direction='column' rowSpacing={1}>
								<Grid container direction='row' spacing={1}>
									<Grid item xs={6}>
										<FormControl fullWidth>
											<InputLabel>班級 *</InputLabel>
											<Select
												label='班級 *'
												name='studentClass'
												options={classes}
												value={studentClass}
												onChange={handleChange}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={6}>
										<FormControl fullWidth>
											<InputLabel>座號 *</InputLabel>
											<Select
												label='座號 *'
												name='number'
												options={numbers}
												value={number}
												onChange={handleChange}
											/>
										</FormControl>
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<FormControl fullWidth>
										<TextField
											label='姓名'
											name='studentName'
											required
											variant='filled'
											value={studentName}
											onChange={handleChange}
											autoComplete='off'
										/>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<FormControl fullWidth>
										<InputLabel>主題 *</InputLabel>
										<Select
											label='主題 *'
											name='mainTopic'
											options={mainTopics}
											value={mainTopic}
											onChange={handleChange}
										/>
									</FormControl>
								</Grid>
								{mainTopic !== '' &&
									mainTopic !== 7 && (
										<Grid item xs={12}>
											<FormControl fullWidth>
												<InputLabel>
													副主題 *
												</InputLabel>
												<Select
													label='副主題 *'
													name='subTopic'
													options={
														subTopics[
															mainTopic
														]
													}
													value={subTopic}
													onChange={handleChange}
												/>
											</FormControl>
										</Grid>
									)}
								{mainTopic === 7 && (
									<Grid item xs={12}>
										<FormControl fullWidth>
											<TextField
												variant='filled'
												required
												label='其他'
												name='otherTopic'
												value={otherTopic}
												onChange={handleChange}
												autoComplete='off'
											/>
										</FormControl>
									</Grid>
								)}
								{(subTopic !== '' ||
									otherTopic !== '') && (
									<>
										<Grid item xs={12}>
											<FormControl fullWidth>
												<TextField
													multiline
													maxRows={6}
													label='備註'
													name='comment'
													onChange={handleChange}
													value={comment}
												/>
											</FormControl>
										</Grid>
										<Grid item xs={12}>
											<FormControl component='fieldset'>
												<FormLabel component='legend'>
													組員人數
												</FormLabel>
												<RadioGroup
													row
													name='memNum'
													value={memNum}
													onChange={handleChange}
												>
													<FormControlLabel
														value={1}
														control={<Radio />}
														label='1'
													/>
													<FormControlLabel
														value={2}
														control={<Radio />}
														label='2'
													/>
													<FormControlLabel
														value={3}
														control={<Radio />}
														label='3'
													/>
												</RadioGroup>
											</FormControl>
										</Grid>
									</>
								)}
								{memNum >= 2 &&
									renderMemberSelect(memNum)}
								<Grid
									container
									item
									direction='row'
									justifyContent='space-between'
								>
									<IconButton onClick={handleDelete}>
										<DeleteOutline />
									</IconButton>
									<Submitbtn
										type='submit'
										disableRipple
										disabled={handleValidation()}
										loading={loading}
										loadingIndicator={
											<CircularProgress
												size={20}
												thickness={6}
											/>
										}
									>
										<Typography
											sx={{
												display: 'flex',
												flexDirection: 'row',
												zIndex: 1,
											}}
										>
											送出
											<Send />
										</Typography>
									</Submitbtn>
								</Grid>
							</Grid>
						</form>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Form;
