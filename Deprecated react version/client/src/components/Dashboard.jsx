import {
	Container,
	Card,
	CardContent,
	Grid,
	Typography,
	FormControl,
	Button,
} from '@mui/material';
import Select from './Select';
import StudentTable from './StudentTable';
import { teachers } from './Options';
import Axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { useModalContext } from '../context/ModalContext';

const Dashboard = () => {
	const { authState, selectedValues, setSelectedValues, selected } = useModalContext();
	const { isAdmin } = authState;
	const { selectedGroup } = selectedValues;
	
	const axios = rateLimit(Axios.create(), {
		maxRequests: 2,
		perMilliseconds: 1000,
		maxRPS: 2,
	});

	const teacher = teachers.filter((res) => {
		return res.value === selectedGroup;
	});

	const [object] = teacher;

	const handleSelect = (e) => {
		setSelectedValues({
			...selectedValues,
			[e.target.name]: e.target.value,
		});
	};

	const handleUpdate = async () => {
		const data = {
			selected: selected,
			group: object.label,
		};

		await axios.post(process.env.REACT_APP_API_URL + '/updateGroup', data);
	};

	const handleDelete = async () => {
		await axios.post(
			process.env.REACT_APP_API_URL + '/deleteGroup',
			selected
		);
	};

	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<Grid container direction='column' spacing={2}>
						<Grid item>
							<Typography variant='h3' textAlign='center'>
								學生分組
							</Typography>
						</Grid>
						<Grid item>
							<StudentTable handleSelect={handleSelect} />
						</Grid>
						{isAdmin && (
							<Grid
								item
								container
								direction='row'
								alignItems='center'
								columnSpacing={2}
							>
								<Grid item>
									<Typography variant='h6' sx={{ ml: 2 }}>
										分配組別
									</Typography>
								</Grid>
								<Grid item sm={4} xs={8}>
									<FormControl fullWidth>
										<Select
											name='selectedGroup'
											value={selectedGroup}
											options={teachers}
											onChange={handleSelect}
											sx={{ ml: 10 }}
										/>
									</FormControl>
								</Grid>
								<div style={{ flexGrow: 1 }} />
								<Grid
									item
									container
									direction='row'
									justifyContent='space-between'
								>
									<Grid item>
										<Button
											variant='contained'
											disabled={selected.length === 0}
											onClick={handleDelete}
											sx={{ margin: 2 }}
										>
											<Typography color='common.white'>
												刪除
											</Typography>
										</Button>
									</Grid>
									<Grid item>
										<Button
											variant='contained'
											disabled={selected.length === 0}
											onClick={handleUpdate}
											sx={{ margin: 2 }}
										>
											<Typography color='common.white'>
												新增
											</Typography>
										</Button>
									</Grid>
								</Grid>
							</Grid>
						)}
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Dashboard;
