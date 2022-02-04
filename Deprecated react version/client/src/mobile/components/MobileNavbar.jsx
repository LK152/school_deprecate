import '../../App.css';
import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Avatar,
    Button,
    Typography,
    styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Close } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useModalContext } from '../../context/ModalContext';
import { auth } from '../../service/firestore';
import { signInWithRedirect, GoogleAuthProvider, signOut } from 'firebase/auth';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    hd: 'lssh.tp.edu.tw',
    prompt: 'select_account',
});
auth.languageCode = 'it';

const NavButton = styled(Button)({
    borderRadius: 20,
    '&:hover': {
        border: 'solid 2px #FFF',
    },
});

const Navbar = () => {
    const { info, authState } = useModalContext();
    const { photoURL } = info ?? {};
    const { isAdmin, isUser } = authState
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        await signInWithRedirect(auth, provider);
        navigate('/');
    };

    const signOutWithGoogle = async () => {
        await signOut(auth);
        handleClick();
        navigate('/');
    };

    const handleClick = () => {
        setOpen(!open);
        document.querySelector('body').style.position = !open
            ? 'fixed'
            : 'unset';
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton onClick={handleClick}>
                        {open ? (
                            <Close color='secondary' />
                        ) : (
                            <MenuIcon color='secondary' />
                        )}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <ul className={open ? 'navDropdown active' : 'navDropdown'}>
                <li>
                    {info ? (
                        photoURL !== null && (
                            <Avatar
                                src={photoURL}
                                sx={{ width: 72, height: 72, my: 3 }}
                            />
                        )
                    ) : (
                        <NavButton
                            onClick={signInWithGoogle}
                            color='secondary'
                            variant='outlined'
                            sx={{ border: 2, my: 3, width: '65vw' }}
                        >
                            <Typography className='navLink' variant='h4'>
                                登入
                            </Typography>
                        </NavButton>
                    )}
                </li>
                <li>
                    <NavButton
                        onClick={handleClick}
                        to='/'
                        component={Link}
                        color='secondary'
                        variant='outlined'
                        sx={{ border: 2, my: 3, width: '65vw' }}
                    >
                        <Typography className='navLink' variant='h4'>
                            首頁
                        </Typography>
                    </NavButton>
                </li>
                {(isUser || isAdmin) && info && (
                    <li>
                        <NavButton
                            onClick={handleClick}
                            to='/dashboard'
                            component={Link}
                            color='secondary'
                            variant='outlined'
                            sx={{ border: 2, my: 3, width: '65vw' }}
                        >
                            <Typography className='navLink' variant='h4'>
                                分組
                            </Typography>
                        </NavButton>
                    </li>
                )}
                {info && isAdmin && (
                    <li>
                        <NavButton
                            onClick={handleClick}
                            to='/users'
                            component={Link}
                            color='secondary'
                            variant='outlined'
                            sx={{ border: 2, my: 3, width: '65vw' }}
                        >
                            <Typography className='navLink' variant='h4'>
                                管理用戶
                            </Typography>
                        </NavButton>
                    </li>
                )}
                {info && !isUser && !isAdmin && (
                    <>
                        <li>
                            <NavButton
                                onClick={handleClick}
                                to='/self-learning-form'
                                component={Link}
                                color='secondary'
                                variant='outlined'
                                sx={{ border: 2, my: 3, width: '65vw' }}
                            >
                                <Typography className='navLink' variant='h4'>
                                    自主學習表單
                                </Typography>
                            </NavButton>
                        </li>
                        <li>
                            <NavButton
                                onClick={handleClick}
                                to='/self-learning-results'
                                component={Link}
                                color='secondary'
                                variant='outlined'
                                sx={{ border: 2, my: 3, width: '65vw' }}
                            >
                                <Typography className='navLink' variant='h4'>
                                    自主學習紀錄
                                </Typography>
                            </NavButton>
                        </li>
                    </>
                )}
                <li>
                    {info && (
                        <NavButton
                            onClick={signOutWithGoogle}
                            color='secondary'
                            variant='outlined'
                            sx={{ border: 2, my: 3, width: '65vw' }}
                        >
                            <Typography className='navLink' variant='h4'>
                                登出
                            </Typography>
                        </NavButton>
                    )}
                </li>
            </ul>
        </Box>
    );
};

export default Navbar;
