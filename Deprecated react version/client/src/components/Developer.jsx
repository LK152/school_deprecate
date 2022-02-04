import { Container, Card, CardContent, Typography, Grid } from '@mui/material';

const PageNotFound = () => {
	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<Grid container direction='column' spacing={4}>
						<Grid item>
							<Typography variant='h1' align='center'>
								開發者團隊
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant='h4' align='center'>
								策劃者:&emsp;金佳龍
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant='h4' align='center'>
								前/後端:&emsp;21屆吳俊霆
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant='h4' align='center'>
								後端:&emsp;21屆張新約
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant='h4' align='center'>
								視覺設計:&emsp;21屆高正
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default PageNotFound;
