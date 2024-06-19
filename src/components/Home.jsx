import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import '../styles/index.css';
import { useEffect } from 'react';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';

const Home = ({ appBarHeight }) => {
    const { loggedIn, logout } = useLogin();
    const theme = useTheme();
    const { setNavOpen } = useLayout();

    useEffect(() => {
        if (!loggedIn) {
            logout();
            setNavOpen(false);
        }
    }, [])

    return (
        <div
            className="home-container"
            style={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
            }}
        >
            <div className="image-section"></div>
            <div className="text-section">
                <div
                    className="grey-section"
                    style={{
                        backgroundColor: theme.palette.customGrey.main,
                        color: theme.palette.text.primary,
                    }}
                >
                    <div className="text-content">
                    <h1 >
                            <Link
                                to="/instructions"
                                className="link-h1"
                                style={{
                                    textDecoration: 'none',
                                    color: theme.palette.text.primary,
                                }}
                            >
                                Pet Finder
                            </Link>
                        </h1>
                    
                        <h2>
                            <Link
                                to="/instructions"
                                className="link-h2"
                                style={{
                                    textDecoration: 'none',
                                    color: theme.palette.text.primary,
                                }}
                            >
                                Find Your Perfect Furry Companion Here
                            </Link>
                        </h2>
                    </div>
                </div>
                <div
                    className="blue-section"
                    style={{
                        backgroundColor: theme.palette.tertiary.main,
                        color: theme.palette.text.primary,
                    }}
                >
                    <p className="text-content"
                    sx={{textAlign:'center'}}>
                        <Link
                            to="/instructions"
                            className="link-p"
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.text.primary,
                            }}
                        >
                            Your new best friend is just a click away!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;