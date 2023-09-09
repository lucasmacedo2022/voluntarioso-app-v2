import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequestEnpoints from '../../apiRequests';
import CustomButton from '../../components/shared/CustomButton';
import CustomSelect from '../../components/shared/CustomSelect';
import MainActions from '../../components/shared/MainActions';
import ONGList from '../../components/Voluntario/ONGList';
import { ONG } from '../../models/ONG';
import Colors from '../../shared/colors';
import { AuthHelper } from '../../helpers/AuthHelper';
import { Voluntario } from '../../models/Voluntario';
import jwtDecode from '../../helpers/JWTHelper';

const fetchONGs = async () => {
    const token = AuthHelper.getToken();
    const tokenConfig = AuthHelper.sendToken(token);

    const result = axios.get<ONG[]>(
        `${apiRequestEnpoints.ObterListaONG}`,
        tokenConfig
    );

    return result;
};

const VoluntarioHomePage = () => {
    const navigate = useNavigate();
    const [volunteer, setVolunteer] = useState<Voluntario>({
        volunId: 0,
        volunName: '',
        volunCPF: '',
        volunEmail: '',
        volunBirthDate: '',
    });
    const [ongList, setOngList] = useState<ONG[]>([]);
    const [categorySelected, setCategorySelected] = useState<string>('default');

    useEffect(() => {
        const token = AuthHelper.getToken();
        const isExpired = AuthHelper.isExpired();

        if (isExpired) {
            navigate('/voluntario');
        } else {
            const voluntario: Voluntario = jwtDecode(token);

            setVolunteer(voluntario);
        }
    }, [navigate]);

    useEffect(() => {
        fetchONGs().then((result) => {
            if (result.status === 401) {
                AuthHelper.logout();
                navigate('/');
            }

            setOngList(result.data);
        });
    }, [navigate]);

    useEffect(() => {
        fetchONGs().then((result) => {
            if (result.status === 401) {
                AuthHelper.logout();
                navigate('/');
            }

            if (categorySelected !== 'default') {
                const filteredONGs = result.data.filter(
                    (ong) => ong.category === categorySelected
                );

                setOngList(filteredONGs);
            } else {
                setOngList(result.data);
            }
        });
    }, [categorySelected, navigate]);

    const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        setCategorySelected(e.target.value);
    };

    const handleProjectPage = () => {
        navigate('new-projects', { state: { volunteerId: volunteer.volunId } });
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
                Olá, {volunteer.volunName}! Selecione suas áreas de interesse!
            </Typography>
            <Box paddingTop={4} />
            <CustomButton
                type='contained'
                name='Tive uma nova ideia!'
                size='large'
                fullWidth={true}
                handle={handleProjectPage}
            />
            <CustomSelect
                placeholder='categoria'
                name='categoria'
                onChange={handleChange}
                value={categorySelected}
            />
            <Box paddingTop={4} />
            {ongList !== null ? (
                <ONGList ongList={ongList} volunteerId={volunteer.volunId} />
            ) : (
                <Typography variant='body1' color='red'>
                    Nenhuma ONG até o momento
                </Typography>
            )}
        </div>
    );
};

export default VoluntarioHomePage;
