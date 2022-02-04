import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import locationIcon from '../images/location-icon.svg';
import phoneIcon from '../images/phone-icon.svg';
import emailIcon from '../images/email-icon.svg';

const Footer = () => {
	return (
		<Box
			sx={{
				width: '100vw',
				height: '400px',
				backgroundColor: '#F3905F',
				position: 'relative',
				left: 0,
				right: 0,
				bottom: 0,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Box sx={{ padding: '60px', mx: 'auto' }}>
				<Grid container direction='column' spacing={2}>
					<Grid item container direction='row'>
						<Grid item xs />
						<Grid item xs={6}>
							<img
								alt='lssh-logo'
								src={logo}
								style={{ width: '100%' }}
							/>
						</Grid>
						<Grid item xs />
					</Grid>
					<Grid item container direction='row' columnGap={1}>
						<Grid item>
							<img alt='location-icon' src={locationIcon} />
						</Grid>
						<Grid item>
							<a
								href='https://goo.gl/maps/nYHxdutSwLggbs789'
								style={{ textDecoration: 'none' }}
							>
								<Typography
									color='common.white'
									sx={{ fontSize: '0.875rem' }}
								>
									114012 台北市內湖區環山路二段100號
								</Typography>
							</a>
						</Grid>
					</Grid>
					<Grid item container direction='row' columnGap={1}>
						<Grid item>
							<img alt='phone-icon' src={phoneIcon} />
						</Grid>
						<Grid item>
							<a
								href='tel:+886 2-2657-0435'
								style={{ textDecoration: 'none' }}
							>
								<Typography
									color='common.white'
									sx={{ fontSize: '0.875rem' }}
								>
									+886 2-2657-0435
								</Typography>
							</a>
						</Grid>
					</Grid>
					<Grid item container direction='row' columnGap={1}>
						<Grid item>
							<img alt='email-icon' src={emailIcon} />
						</Grid>
						<Grid item>
							<a
								href='mailto:learningplan@lssh.tp.edu.tw'
								style={{ textDecoration: 'none' }}
							>
								<Typography
									color='common.white'
									sx={{ fontSize: '0.875rem' }}
								>
									learningplan@lssh.tp.edu.tw
								</Typography>
							</a>
						</Grid>
					</Grid>
					<Grid item container direction='row'>
						<Grid item>
							<Typography
								color='common.white'
								sx={{ fontSize: '0.875rem' }}
							>
								&copy;&emsp;
								{new Date().getFullYear()}
							</Typography>
						</Grid>
						<Grid item>
							<a
								href='http://www.lssh.tp.edu.tw/'
								style={{ textDecoration: 'none' }}
							>
								<Typography
									color='common.white'
									sx={{ fontSize: '0.875rem' }}
								>
									&ensp;台北市立麗山高級中學
								</Typography>
							</a>
						</Grid>
						<Grid item>
							<Typography
								color='common.white'
								sx={{
									fontSize: '0.875rem',
								}}
							>
								&emsp;|&emsp;Powered by&ensp;
							</Typography>
						</Grid>
						<Grid item>
							<Typography
								to='/developer'
								color='common.white'
								sx={{
									textDecoration: 'none',
									fontSize: '0.875rem',
								}}
								component={Link}
							>
								LK Dev
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Footer;
