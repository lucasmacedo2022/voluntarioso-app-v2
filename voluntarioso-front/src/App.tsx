import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ONGHomePage from './pages/ONG/ONGHomePage';
import RegisterPage from './pages/RegisterPage';
import VoluntarioHomePage from './pages/Voluntario/VoluntarioHomePage';
import ONGVoluntarioList from './components/ONG/Voluntario/ONGVoluntarioList';
import ONGCandidatosList from './components/ONG/Candidatos/ONGCandidatoList';
import ONGDetail from './components/ONG/ONGDetail';
import ProjectsPage from './pages/Projects/ProjectsPage';
import ProjectForm from './components/ONG/Projects/ProjectForm';
import ProjectInfo from './components/ONG/Projects/ProjectInfo';
import ProjectList from './components/ONG/Projects/ProjectList';

function App() {
    return (
        <Container maxWidth='xs'>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='voluntario'>
                    <Route index element={<LoginPage type='Voluntário' />} />
                    <Route
                        index
                        path='register'
                        element={<RegisterPage type='Voluntário' />}
                    />
                    <Route path='home'>
                        <Route index element={<VoluntarioHomePage />} />
                        <Route
                            path='ong-details/:ongId'
                            element={<ONGDetail />}
                        />
                        <Route path='new-projects' element={<ProjectsPage />}>
                            <Route index element={<ProjectList />} />
                            <Route path='info' element={<ProjectInfo />} />
                            <Route path='add' element={<ProjectForm />} />
                        </Route>
                    </Route>
                </Route>
                <Route path='ong'>
                    <Route index element={<LoginPage type='ONG' />} />
                    <Route
                        index
                        path='register'
                        element={<RegisterPage type='ONG' />}
                    />
                    <Route path='home'>
                        <Route index element={<ONGHomePage />} />
                        <Route path=':id' element={<ONGVoluntarioList />} />
                        <Route
                            path=':id/candidatos'
                            element={<ONGCandidatosList />}
                        />
                    </Route>
                </Route>
            </Routes>
        </Container>
    );
}

export default App;
