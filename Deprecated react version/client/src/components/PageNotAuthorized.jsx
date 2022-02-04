import { Container, Card, CardContent, Typography } from '@mui/material';

const PageNotAuthorized = () => {
	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<Typography variant='h1' align='center'>401 unauthorized</Typography>
				</CardContent>
			</Card>
		</Container>
	);
};

export default PageNotAuthorized;