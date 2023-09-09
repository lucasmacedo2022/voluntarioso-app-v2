import { Alert, Box, Button, Typography } from '@mui/material';
import Colors from '../../../shared/colors';
import CustomInput from '../../shared/CustomInput';
import { Project } from '../../../models/Project';
import { ChangeEvent, useEffect, useState } from 'react';
import CustomSelect from '../../shared/CustomSelect';
import CustomButton from '../../shared/CustomButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiRequestEnpoints from '../../../apiRequests';
import { AuthHelper } from '../../../helpers/AuthHelper';
import jwtDecode from '../../../helpers/JWTHelper';
import { Voluntario } from '../../../models/Voluntario';
import CustomAlertDialogRegisterProject from '../../shared/CustomAlertDialogRegisterProject';

const ProjectForm = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [volunteerId, setVolunteerId] = useState<number>(0);
    const [project, setProject] = useState<Project>({
        name: '',
        goal: '',
        category: '',
        expertise: '',
        infrastructure: '',
        volunteerId: 0,
    });
    const [errorValidation, setErrorValidation] = useState<any[]>([]);

    useEffect(() => {
        const token = AuthHelper.getToken();
        const isExpired = AuthHelper.isExpired();

        if (isExpired) {
            navigate('/voluntario');
        } else {
            const voluntario: Voluntario = jwtDecode(token);

            setVolunteerId(voluntario.volunId);
        }
    }, [navigate]);

    useEffect(() => {
        const timer = setInterval(() => {
            setErrorValidation((prevState) => prevState.slice(1));
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleOpenDialog = () => {
        navigate('/voluntario/home/new-projects');
    };

    const handleRegisterProject = async () => {
        const token = AuthHelper.getToken();
        const tokenConfig = AuthHelper.sendToken(token);

        try {
            const registerProjectObj: Project = {
                name: project.name,
                goal: project.goal,
                category: project.category,
                expertise: project.expertise,
                infrastructure: project.infrastructure,
                volunteerId: volunteerId,
            };
            const resultRegister = await axios.post<boolean>(
                `${apiRequestEnpoints.ProjectRegister}`,
                registerProjectObj,
                tokenConfig
            );

            if (resultRegister) {
                if (resultRegister.status === 200) {
                    setOpen(true);
                } else if (resultRegister.status === 401) {
                    AuthHelper.logout();
                    navigate('/');
                }
            }
        } catch (err: any) {
            setErrorValidation(err.response.data.errors);
        }
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        setProject((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div>
            <CustomAlertDialogRegisterProject
                open={open}
                handleClose={handleOpenDialog}
            />
            <Box paddingBottom={3}>
                <Typography variant='h3' color={Colors.blue} fontWeight='bold'>
                    Minha Ideia
                </Typography>
            </Box>
            {errorValidation &&
                errorValidation.map((errValidation, idx) => {
                    return (
                        <Alert
                            key={idx}
                            sx={{ marginY: '1rem', borderRadius: '1rem' }}
                            severity='error'
                        >
                            {errValidation}
                        </Alert>
                    );
                })}
            <Box paddingBottom={5}>
                <CustomInput
                    labelName='nome do projeto'
                    placeholder='digite uma sugestão de nome'
                    name='name'
                    type='text'
                    onChange={handleChange}
                    value={project.name}
                />
                <CustomInput
                    labelName='objetivo'
                    placeholder='descreve resumidamente o objetivo'
                    name='goal'
                    type='text'
                    onChange={handleChange}
                    value={project.goal}
                />
                <CustomSelect
                    labelName='categoria'
                    placeholder='selecione a categoria'
                    name='category'
                    onChange={handleChange}
                    value={project.category}
                />
                <CustomInput
                    labelName='expertise'
                    placeholder='descreva duas áreas de domínio'
                    name='expertise'
                    type='text'
                    onChange={handleChange}
                    value={project.expertise}
                />
                <CustomInput
                    labelName='infraestrutura'
                    placeholder='descreva os recursos necessários'
                    name='infrastructure'
                    type='text'
                    onChange={handleChange}
                    value={project.infrastructure}
                />
            </Box>
            <Button
                onClick={handleRegisterProject}
                fullWidth
                variant='contained'
                size='large'
                sx={{
                    backgroundColor: `${Colors.purple}`,
                    color: 'white',
                    '&:hover': { backgroundColor: `${Colors.purple}` },
                    borderRadius: '15px',
                    height: '3rem',
                }}
            >
                Quero criar uma nova causa!
            </Button>
            <Box paddingY={1} />
            <CustomButton
                fullWidth
                handle={handleBack}
                type='outlined'
                name='voltar'
            />
        </div>
    );
};

export default ProjectForm;
