import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiRequestEnpoints from '../../../apiRequests';
import CustomButton from '../../shared/CustomButton';
import { ONG } from '../../../models/ONG';
import { Voluntario } from '../../../models/Voluntario';
import Colors from '../../../shared/colors';
import VoluntarioSingle from './ONGVoluntarioSingle';
import MainActions from '../../shared/MainActions';
import { AuthHelper } from '../../../helpers/AuthHelper';

const ONGVoluntarioList = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [volunNome, setVolunNome] = useState<string>('');
    const [volunId, setVolunId] = useState<number>(0);
    const [ongVoluntarios, setOngVoluntarios] = useState<Voluntario[]>([]);
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
                .get<ONG[]>(
                    `${apiRequestEnpoints.ObterONGVoluntariosByOngId}/${id}`,
                    tokenConfig
                )
                .then(({ data, status }) => {
                    if (status === 401) {
                        setIsAuthenticated(false);
                        AuthHelper.logout();
                        navigate('/');
                    }

                    setIsAuthenticated(true);

                    const result = data[0].volunteers.filter((x) =>
                        data[0].ongVolunteers.some(
                            (y) =>
                                y.volunteerId === x.volunId &&
                                y.volunteerApproved
                        )
                    );

                    setOngVoluntarios([...result]);
                });
        }
    }, [id, navigate]);

    const handleSelect = () => {
        alert(`Simulando seleção do Voluntário com Nome: ${volunNome}`);
    };

    const handleEdit = () => {
        alert(`Simulando edição do Voluntário com Nome: ${volunNome}`);
    };

    const handleRemove = async () => {
        const token = AuthHelper.getToken();
        const tokenConfig = AuthHelper.sendToken(token);

        const result = await axios.delete(
            `${apiRequestEnpoints.RemoverVoluntario}?volunteerId=${volunId}&ongId=${id}`,
            tokenConfig
        );

        if (result.status === 401) {
            setIsAuthenticated(false);
            AuthHelper.logout();
            navigate('/');
        }

        const updatedOngVoluntarios = ongVoluntarios?.filter(
            (x) => x.volunId !== volunId
        );

        setOngVoluntarios(updatedOngVoluntarios);
    };

    const handleSelectVoluntarioNome = (volNome: string) => {
        setVolunNome(volNome);
    };

    const handleSelectVoluntarioId = (volId: number) => {
        setVolunId(volId);

        alert(`Voluntário com id ${volId} selecionado com sucesso`);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        AuthHelper.logout();
        navigate('/');
    };

    return isAuthenticated ? (
        <div style={{ paddingBottom: '2rem' }}>
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
                Nossos Voluntários
            </Typography>
            <Box paddingY={2} />
            {ongVoluntarios && ongVoluntarios.length > 0 ? (
                ongVoluntarios.map((voluntario) => (
                    <Fragment key={voluntario.volunId}>
                        <VoluntarioSingle
                            key={voluntario.volunId}
                            voluntario={voluntario}
                            selectVoluntarioNome={handleSelectVoluntarioNome}
                            selectVoluntarioId={handleSelectVoluntarioId}
                        />
                        <Fragment>
                            <Box paddingY={1} />
                            <Box display='flex' justifyContent='space-around'>
                                <CustomButton
                                    handle={handleSelect}
                                    fullWidth={false}
                                    size='large'
                                    type='contained'
                                    name='Selecionar'
                                />
                                <CustomButton
                                    handle={handleEdit}
                                    fullWidth={false}
                                    size='large'
                                    type='contained'
                                    name='Editar'
                                />
                                <CustomButton
                                    handle={handleRemove}
                                    fullWidth={false}
                                    size='large'
                                    type='contained'
                                    name='Deletar'
                                />
                            </Box>
                        </Fragment>
                    </Fragment>
                ))
            ) : (
                <Typography color='red'>
                    Nenhum Voluntário até o momento
                </Typography>
            )}
        </div>
    ) : (
        <></>
    );
};

export default ONGVoluntarioList;
