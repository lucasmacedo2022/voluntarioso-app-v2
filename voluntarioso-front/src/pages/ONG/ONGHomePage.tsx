import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Colors from '../../shared/colors';
import { cnpj as cnpjFormat } from 'cpf-cnpj-validator';
import CustomButton from '../../components/shared/CustomButton';
import MainActions from '../../components/shared/MainActions';
import { AuthHelper } from '../../helpers/AuthHelper';
import { useEffect, useState } from 'react';
import jwtDecode from '../../helpers/JWTHelper';
import { ONG } from '../../models/ONG';

const ONGHomePage = () => {
    const navigate = useNavigate();
    const [ong, setOng] = useState<ONG>({
        id: 0,
        name: '',
        cnpj: '',
        category: '',
        email: '',
        ongVolunteers: [],
        volunteers: [],
        mission: '',
        actions: '',
        cause: '',
    });

    useEffect(() => {
        const token = AuthHelper.getToken();
        const isExpired = AuthHelper.isExpired();

        if (isExpired) {
            navigate('/ong');
        } else {
            const ong: ONG = jwtDecode(token);

            setOng(ong);
        }
    }, [navigate]);

    const handleVoluntarios = () => {
        navigate(`${ong.id}`);
    };

    const handleCandidatos = () => {
        navigate(`${ong.id}/candidatos`);
    };

    const handleLogout = () => {
        AuthHelper.logout();
        navigate('/');
    };

    return (
        <div>
            <MainActions>
                <CustomButton
                    type='outlined'
                    name='Logout'
                    size='large'
                    fullWidth={false}
                    handle={handleLogout}
                />
            </MainActions>
            <Typography variant='h5' color={Colors.purple} fontWeight='bold'>
                Olá, {ong.name}!
            </Typography>
            <Box
                component='img'
                paddingY={4}
                sx={{
                    width: '100%',
                    height: '100%',
                }}
                src={`${process.env.PUBLIC_URL}/assets/image1.png`}
            />
            <Typography
                variant='h6'
                align='center'
                color={Colors.purple}
                fontWeight='bold'
            >
                {ong.name}
            </Typography>
            <Typography variant='body1' align='center' color={Colors.blue}>
                CNPJ: {cnpjFormat.format(ong.cnpj)}
            </Typography>
            <Box paddingY={2} />
            <Box
                border={1}
                borderColor={Colors.blue}
                padding={2}
                color={Colors.blue}
                marginBottom={2}
            >
                <Typography variant='h6'>Nossa missão:</Typography>
                <Typography variant='body1'>{ong.mission}</Typography>
            </Box>
            <Box
                border={1}
                borderColor={Colors.blue}
                padding={2}
                color={Colors.blue}
                marginBottom={2}
            >
                <Typography variant='h6'>Nossas Ações:</Typography>
                <Typography variant='body1'>{ong.actions}</Typography>
            </Box>
            <Box
                border={1}
                borderColor={Colors.blue}
                padding={2}
                color={Colors.blue}
                marginBottom={5}
            >
                <Typography variant='h6'>Nossa causa:</Typography>
                <Typography variant='body1'>{ong.cause}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-evenly'>
                <CustomButton
                    fullWidth={false}
                    size='large'
                    handle={handleVoluntarios}
                    type='contained'
                    name='Voluntários'
                />
                <CustomButton
                    fullWidth={false}
                    size='large'
                    handle={handleCandidatos}
                    type='contained'
                    name='Candidatos'
                />
            </Box>
        </div>
    );
};

export default ONGHomePage;
