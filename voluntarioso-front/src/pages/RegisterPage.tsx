import { Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequestEnpoints from '../apiRequests';
import CustomAlertDialogRegister from '../components/shared/CustomAlertDialogRegister';
import CustomButton from '../components/shared/CustomButton';
import CustomInput from '../components/shared/CustomInput';
import CustomSelect from '../components/shared/CustomSelect';
import MainActions from '../components/shared/MainActions';
import Colors from '../shared/colors';
import { AuthHelper } from '../helpers/AuthHelper';
import CustomInputCNPJ from '../components/shared/CustomInputCNPJ';
import CustomInputCPF from '../components/shared/CustomInputCPF';

interface IRegisterPage {
    type: 'Voluntário' | 'ONG';
}

const RegisterPage = ({ type }: IRegisterPage) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [registerONG, setRegisterONG] = useState({
        name: '',
        cnpj: '',
        category: '',
        email: '',
        password: '',
        mission: '',
        actions: '',
        cause: '',
    });
    const [registerVoluntario, setRegisterVoluntario] = useState({
        volunName: '',
        volunCpf: '',
        volunBirthDate: new Date().toISOString(),
        volunEmail: '',
        volunPassword: '',
    });
    const [errorValidation, setErrorValidation] = useState<any[]>([]);

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
        if (type === 'ONG') {
            navigate('/ong/home');
        } else if (type === 'Voluntário') {
            navigate('/voluntario/home');
        }
    };

    const handleRegisterONG = async () => {
        try {
            const resultRegister = await axios.post<boolean>(
                `${apiRequestEnpoints.ONGRegister}`,
                registerONG
            );

            if (resultRegister) {
                const loginONG = {
                    email: registerONG.email,
                    password: registerONG.password,
                };

                const resultLogin = await axios.post(
                    `${apiRequestEnpoints.ONGLogin}`,
                    loginONG
                );

                if (resultLogin.status === 200) {
                    setOpen(true);
                    AuthHelper.saveToken(resultLogin.data);
                }
            }
        } catch (err: any) {
            setErrorValidation(err.response.data.errors);
        }
    };

    const handleRegisterVoluntario = async () => {
        try {
            const resultRegister = await axios.post<boolean>(
                `${apiRequestEnpoints.VoluntarioRegister}`,
                registerVoluntario
            );

            if (resultRegister) {
                const loginVolunteer = {
                    email: registerVoluntario.volunEmail,
                    password: registerVoluntario.volunPassword,
                };

                const resultLogin = await axios.post(
                    `${apiRequestEnpoints.VoluntarioLogin}`,
                    loginVolunteer
                );

                if (resultLogin.status === 200) {
                    setOpen(true);
                    AuthHelper.saveToken(resultLogin.data);
                }
            }
        } catch (err: any) {
            setErrorValidation(err.response.data.errors);
        }
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        if (type === 'ONG') {
            setRegisterONG((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        } else {
            setRegisterVoluntario((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        }
    };

    return (
        <div>
            <CustomAlertDialogRegister
                open={open}
                type={type}
                handleClose={handleOpenDialog}
            />
            <Box paddingTop={4} />
            <MainActions />
            <Typography variant='h3' color={Colors.purple} fontWeight='bold'>
                Cadastro {type}
            </Typography>
            <Box paddingY={5} />
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
            {type === 'ONG' ? (
                <>
                    <CustomInput
                        labelName='nome da instituição'
                        placeholder='digite o nome da instituição'
                        type='text'
                        onChange={handleChange}
                        value={registerONG.name}
                        name='name'
                    />
                    <CustomInputCNPJ
                        labelName='cnpj'
                        type='text'
                        name='cnpj'
                        onChange={handleChange}
                        value={cnpj.format(registerONG.cnpj)}
                        placeholder='00.000.000/0000-00'
                    />
                    <CustomSelect
                        labelName='categoria'
                        placeholder='categoria'
                        name='category'
                        onChange={handleChange}
                        value={registerONG.category}
                    />
                    <CustomInput
                        labelName='missão'
                        placeholder='digite a missão da ONG'
                        type='text'
                        onChange={handleChange}
                        value={registerONG.mission}
                        name='mission'
                    />
                    <CustomInput
                        labelName='ações'
                        placeholder='digite as ações da ONG'
                        type='text'
                        onChange={handleChange}
                        value={registerONG.actions}
                        name='actions'
                    />
                    <CustomInput
                        labelName='causa'
                        placeholder='digite a causa da ONG'
                        type='text'
                        onChange={handleChange}
                        value={registerONG.cause}
                        name='cause'
                    />
                </>
            ) : (
                <>
                    <CustomInput
                        labelName='nome completo'
                        placeholder='digite o seu nome completo'
                        name='volunName'
                        type='text'
                        onChange={handleChange}
                        value={registerVoluntario.volunName}
                    />
                    <CustomInput
                        labelName='data de nascimento'
                        placeholder='00/00/0000'
                        name='volunBirthDate'
                        type='date'
                        onChange={handleChange}
                        value={registerVoluntario.volunBirthDate}
                    />
                    <CustomInputCPF
                        labelName='cpf'
                        placeholder='000.000.000-00'
                        name='volunCpf'
                        type='text'
                        onChange={handleChange}
                        value={cpf.format(registerVoluntario.volunCpf)}
                    />
                </>
            )}
            <CustomInput
                labelName='email'
                placeholder={
                    type === 'ONG' ? 'emailONG@gmail.com' : 'email@gmail.com'
                }
                type='email'
                name={type === 'ONG' ? 'email' : 'volunEmail'}
                value={
                    type === 'ONG'
                        ? registerONG.email
                        : registerVoluntario.volunEmail
                }
                onChange={handleChange}
            />
            <CustomInput
                labelName='senha'
                placeholder='digite sua senha'
                type='password'
                name={type === 'ONG' ? 'password' : 'volunPassword'}
                value={
                    type === 'ONG'
                        ? registerONG.password
                        : registerVoluntario.volunPassword
                }
                onChange={handleChange}
            />
            <Box paddingY={2} />
            <Box paddingBottom={2} />
            <CustomButton
                fullWidth
                handle={
                    type === 'ONG'
                        ? handleRegisterONG
                        : handleRegisterVoluntario
                }
                type='contained'
                name='cadastrar'
            />
            <Box paddingBottom={2} />
            <CustomButton
                fullWidth
                handle={handleBack}
                type='outlined'
                name='voltar'
            />
            <Box paddingBottom={5} />
        </div>
    );
};

export default RegisterPage;
