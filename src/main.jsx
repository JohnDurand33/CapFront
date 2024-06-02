import { createRoot } from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider,  } from '@mui/material';

const Main = () => {

    return (
            <App />
    );
};
createRoot(document.getElementById('root')).render(<Main />);


