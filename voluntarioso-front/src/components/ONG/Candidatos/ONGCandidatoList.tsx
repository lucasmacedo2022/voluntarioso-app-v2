import { Typography, Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiRequestEnpoints from '../../../apiRequests';
import { ONG } from '../../../models/ONG';
import { Voluntario } from '../../../models/Voluntario';
import Colors from '../../../shared/colors';
import CustomButton from '../../shared/CustomButton';
import MainActions from '../../shared/MainActions';
import ONGCandidatoSingle from './ONGCandidatoSingle';
import { AuthHelper } from '../../../helpers/AuthHelper';

const ONGCandidatoList = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [volunId, setVolunId] = useState<number>(0);
    const [ongCandidatos, setOngCandidatos] = useState<Voluntario[]>();
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
                                !y.volunteerApproved
                        )
                    );

                    setOngCandidatos([...result]);
                });
        }
    }, [id, navigate]);

    const handleAceitar = async () => {
        const token = AuthHelper.getToken();
        const tokenConfig = AuthHelper.sendToken(token);

        const result = await axios.put(
            `${apiRequestEnpoints.AceitarVoluntario}?volunteerId=${volunId}&ongId=${id}`,
            tokenConfig
        );

        if (result.status === 401) {
            setIsAuthenticated(false);
            AuthHelper.logout();
            navigate('/');
        }

        const updatedOngCandidatos = ongCandidatos?.filter(
            (x) => x.volunId !== volunId
        );

        setOngCandidatos(updatedOngCandidatos);
    };

    const handleSelectCandidatoId = (volId: number) => {
        setVolunId(volId);

        alert(`Candidato com id ${volId} selecionado com sucesso`);
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
                Candidatos
            </Typography>
            <Box paddingY={2} />
            {ongCandidatos && ongCandidatos!.length > 0 ? (
                ongCandidatos.map((candidato) => (
                    <>
                        <ONGCandidatoSingle
                            key={candidato.volunId}
                            candidato={candidato}
                            selectCandidatoId={handleSelectCandidatoId}
                        />
                        <Box paddingY={1} />
                        <Box display='flex' justifyContent='center'>
                            <CustomButton
                                handle={handleAceitar}
                                fullWidth={false}
                                size='large'
                                type='contained'
                                name='Aceitar?'
                            />
                        </Box>
                    </>
                ))
            ) : (
                <Typography color='red'>
                    Nenhum Candidato até o momento
                </Typography>
            )}
        </div>
    ) : (
        <></>
    );
};

export default ONGCandidatoList;
