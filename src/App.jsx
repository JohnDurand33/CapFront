import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginProvider } from './contexts/LoginContext';
import { LayoutProvider } from './contexts/LayoutContext';
import { DogSearchProvider } from './contexts/DogSearchContext';
import DragAndDropContextComponent from './contexts/DragAndDropContext';
import BreedSearchView from './components/BreedSearchView';
import BreedSearchForm from './components/BreedSearchForm';
import Home from './components/Home';
import Layout from './components/Layout';
import LogIn from './components/LogIn';
import SignUpForm from './components/SignUpForm';
import useAppBarHeight from './hooks/useAppBarHeight';

const App = () => {
    const [appBarHeight, appBarRef] = useAppBarHeight();
    const [myBreeds, setMyBreeds] = useState([]);

    return (
        <LoginProvider>
            <LayoutProvider>
                <DogSearchProvider>
                    <DragAndDropContextComponent>
                        <Routes>
                            <Route path="/*" element={<Layout appBarRef={appBarRef} appBarHeight={appBarHeight} myBreeds={myBreeds} setMyBreeds={setMyBreeds} />}>
                                <Route index element={<Home />} />
                                <Route path="signup" element={<SignUpForm />} />
                                <Route path="login" element={<LogIn />} />
                                <Route path="breedview" element={<BreedSearchView myBreeds={myBreeds} setMyBreeds={setMyBreeds} />} />
                            </Route>
                        </Routes>
                    </DragAndDropContextComponent>
                </DogSearchProvider>
            </LayoutProvider>
        </LoginProvider>
    );
};

export default App;