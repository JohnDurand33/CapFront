import { useState, useMemo }from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginProvider } from './contexts/LoginContext';
import { LayoutProvider } from './contexts/LayoutContext';
import { DogSearchProvider } from './contexts/DogSearchContext';
import DndContext from './contexts/DndContext';
import BreedSearchView from './components/BreedSearchView';
import Home from './components/Home';
import Layout from './components/Layout';
import LogIn from './components/LogIn';
import SignUpForm from './components/SignUpForm';
import useAppBarHeight from './hooks/useAppBarHeight';
import DogSearchView from './components/DogSearchView';


const App = ({ mode, toggleMode }) => {
    const [appBarHeight, appBarRef] = useAppBarHeight();

    return (
        <DogSearchProvider>
            <LoginProvider>
                <LayoutProvider>
                    <DndContext>
                        <Routes>
                            <Route path="/*" element={<Layout appBarRef={appBarRef} appBarHeight={appBarHeight} toggleMode={toggleMode} mode={mode}/>}>
                                <Route index element={<Home />} />
                                <Route path="signup" element={<SignUpForm />} />
                                <Route path="login" element={<LogIn />} />
                                <Route path="breedview" element={<BreedSearchView />} />
                                <Route path="dogsearch" element={<DogSearchView />} />
                            </Route>
                        </Routes>
                    </DndContext>
                </LayoutProvider>
            </LoginProvider>
        </DogSearchProvider >
    );
};

export default App;