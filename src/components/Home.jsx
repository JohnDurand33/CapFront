import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import '../styles/index.css';

const Home = () => {
    const theme = useTheme();

    return (
        <div
            className="home-container"
        >
            <div className="image-section"></div>
            <div className="text-section">
                <div
                    className="grey-section"
                    sx={{
                        backgroundColor: theme.palette.customGrey.main,
                        color: theme.palette.text.primary,
                    }}
                    href='/find-your-companion'
                >
                    <div className="text-content">
                        <h1>Perfect Pet Finder</h1>
                        <h2>
                            <Link to="/find-your-companion" className="link"
                                sx={{
                                    textDecoration: 'none',
                                    color: theme.palette.text.primary,
                                }}>
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
                    <div className="text-content">
                        <p>
                            <Link to="/about-us" className="link">
                                Your new best friend is just a click away!
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;