import { Button, Box, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import Colors from '../../../shared/colors';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiRequestEnpoints from '../../../apiRequests';
import { AuthHelper } from '../../../helpers/AuthHelper';
import { Project } from '../../../models/Project';
import ProjectSingle from './ProjectSingle';

const ProjectList = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const isExpired = AuthHelper.isExpired();

        if (isExpired) {
            setIsAuthenticated(false);
            AuthHelper.logout();
            navigate('/');
        } else {
            const token = AuthHelper.getToken();
            const tokenConfig = AuthHelper.sendToken(token);

            axios
                .get<Project[]>(
                    `${apiRequestEnpoints.ObterProjetos}`,
                    tokenConfig
                )
                .then(({ data, status }) => {
                    if (status === 401) {
                        setIsAuthenticated(false);
                        AuthHelper.logout();
                        navigate('/');
                    }

                    setIsAuthenticated(true);

                    setProjects([...data]);
                });
        }
    }, [navigate]);

    const handleAddProject = () => {
        navigate('info');
    };

    return isAuthenticated ? (
        <>
            <Button
                variant='contained'
                color='primary'
                fullWidth
                sx={{ borderRadius: '15px', height: '3rem' }}
                onClick={handleAddProject}
            >
                Adicionar ideia!
            </Button>
            <Box paddingY={2} />
            <Typography variant='h5' color={Colors.blue} fontWeight='bold'>
                Vote e fortaleça novos projetos
            </Typography>
            <Box paddingY={2} />
            {projects && projects!.length > 0 ? (
                projects.map((project) => (
                    <Fragment key={project.id}>
                        <ProjectSingle project={project} />
                        <Box paddingY={1} />
                    </Fragment>
                ))
            ) : (
                <Typography color='red'>
                    Nenhum novo projeto até o momento
                </Typography>
            )}
        </>
    ) : (
        <></>
    );
};

export default ProjectList;
