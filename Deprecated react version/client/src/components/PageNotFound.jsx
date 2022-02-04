import { Container, Card, CardContent, Typography } from '@mui/material';

const PageNotFound = () => {
	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<Typography variant='h1' align='center'>404 page not found</Typography>
				</CardContent>
			</Card>
		</Container>
	);
};

export default PageNotFound