import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { cnpj } from 'cpf-cnpj-validator';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import apiRequestEnpoints from '../../apiRequests';
import { ONG } from '../../models/ONG';
import Colors from '../../shared/colors';
import CustomButton from '../shared/CustomButton';
import MainActions from '../shared/MainActions';
import { AuthHelper } from '../../helpers/AuthHelper';

const ONGDetail = () => {
    const {
        state: { voluntarioId },
    } = useLocation();
    const { ongId } = useParams();
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
                .get<ONG>(
                    `${apiRequestEnpoints.ObterONGById}/${ongId}`,
                    tokenConfig
                )
                .then(({ data, status }) => {
                    if (status === 401) {
                        setIsAuthenticated(false);
                        AuthHelper.logout();
                        navigate('/');
                    }

                    setIsAuthenticated(true);
                    setOng(data);
                });
        }
    }, [ongId, navigate]);

    const handleCandidatarONG = async () => {
        const token = AuthHelper.getToken();
        const tokenConfig = AuthHelper.sendToken(token);

        const result = await axios.post(
            `${apiRequestEnpoints.CandidatarONG}?volunteerId=${voluntarioId}&ongId=${ongId}`,
            tokenConfig
        );

        if (result.status === 401) {
            setIsAuthenticated(false);
            AuthHelper.logout();
            navigate('/');
        } else if (result.status === 204) {
            alert(`Você se candidatou a ONG com sucesso`);

            navigate(-1);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        AuthHelper.logout();
        navigate('/');
    };

    return isAuthenticated ? (
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
            {ong.name !== null && (
                <>
                    <Box
                        sx={{ backgroundColor: `${Colors.purple}` }}
                        paddingY={4}
                        paddingX={2}
                        borderRadius={5}
                    >
                        <Typography
                            variant='h5'
                            color='white'
                            fontWeight='bold'
                        >
                            {ong.name}
                        </Typography>
                        <Typography variant='h6' color='white'>
                            {cnpj.format(ong.cnpj)}
                        </Typography>
                        <Typography variant='h6' color='white'>
                            Categoria: {ong.category}
                        </Typography>
                    </Box>
                    <Box
                        component='img'
                        paddingY={2}
                        sx={{
                            width: '100%',
                            height: '100%',
                        }}
                        src={`${process.env.PUBLIC_URL}/assets/image1.png`}
                    />
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
                        marginBottom={2}
                    >
                        <Typography variant='h6'>Nossa causa:</Typography>
                        <Typography variant='body1'>{ong.cause}</Typography>
                    </Box>
                    <CustomButton
                        fullWidth
                        name='Quero me juntar a causa!'
                        type='contained'
                        handle={handleCandidatarONG}
                    />
                </>
            )}
        </div>
    ) : (
        <></>
    );
};

export default ONGDetail;
