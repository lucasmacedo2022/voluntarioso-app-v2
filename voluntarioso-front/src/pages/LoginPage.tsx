import { Alert, Box, Typography } from '@mui/material';
import CustomButton from '../components/shared/CustomButton';
import CustomInput from '../components/shared/CustomInput';
import Colors from '../shared/colors';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import apiRequestEnpoints from '../apiRequests';
import CustomAlertDialog from '../components/shared/CustomAlertDialog';
import MainActions from '../components/shared/MainActions';
import { Login } from '../models/Login';
import { AuthHelper } from '../helpers/AuthHelper';

interface IRegisterPage {
    type: 'Voluntário' | 'ONG';
}

const LoginPage = ({ type }: IRegisterPage) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [loginONG, setLoginONG] = useState<Login>({
        email: '',
        password: '',
    });
    const [loginVoluntario, setLoginVoluntario] = useState({
        volunEmail: '',
        volunPassword: '',
    });
    const [errorValidation, setErrorValidation] = useState<any[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setErrorValidation((prevState) => prevState.slice(1));
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        AuthHelper.logout();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogin = async () => {
        try {
            if (type === 'ONG') {
                const result = await axios.post(
                    `${apiRequestEnpoints.ONGLogin}`,
                    loginONG
                );

                if (result.status === 200) {
                    AuthHelper.saveToken(result.data);
                    navigate('home');
                }
            } else {
                var loginVolunObj = {
                    email: loginVoluntario.volunEmail,
                    password: loginVoluntario.volunPassword,
                };

                const result = await axios.post(
                    `${apiRequestEnpoints.VoluntarioLogin}`,
                    loginVolunObj
                );

                if (result.status === 200) {
                    AuthHelper.saveToken(result.data);
                    navigate('home');
                }
            }
        } catch (err: any) {
            if (err.response.status !== 200) {
                if (Array.isArray(err.response.data.errors)) {
                    setErrorValidation(err.response.data.errors);
                } else {
                    setOpen(true);
                }
            }
        }
    };

    const handleRegister = () => {
        navigate('register');
    };

    const handleForgotPassword = () => {
        alert('Demonstração de esquecer senha');
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        if (type === 'ONG') {
            setLoginONG((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        } else {
            setLoginVoluntario((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        }
    };

    return (
        <div>
            <CustomAlertDialog
                open={open}
                type={type}
                handleClose={handleClose}
            />
            <MainActions />
            <Typography variant='h3' color={Colors.purple} fontWeight='bold'>
                Login {type}
            </Typography>
            <Box paddingY={8} />
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
            <CustomInput
                labelName='email'
                placeholder='email@email.com'
                type='email'
                value={
                    type === 'ONG' ? loginONG.email : loginVoluntario.volunEmail
                }
                name={type === 'ONG' ? 'email' : 'volunEmail'}
                onChange={handleChange}
            />
            <CustomInput
                labelName='senha'
                type='password'
                placeholder='digite sua senha'
                name={type === 'ONG' ? 'password' : 'volunPassword'}
                value={
                    type === 'ONG'
                        ? loginONG.password
                        : loginVoluntario.volunPassword
                }
                onChange={handleChange}
            />
            <Typography paddingTop={1} align='right' color={Colors.blue}>
                <span
                    onClick={handleForgotPassword}
                    style={{ cursor: 'pointer' }}
                >
                    esqueceu sua senha?
                </span>
            </Typography>
            <Box paddingBottom={2} />
            <CustomButton
                fullWidth
                handle={handleLogin}
                type='contained'
                name='LOGIN'
            />
            <Box paddingBottom={2} />
            <CustomButton
                fullWidth
                handle={handleRegister}
                type='outlined'
                name='não tenho cadastro'
            />
        </div>
    );
};

export default LoginPage;
