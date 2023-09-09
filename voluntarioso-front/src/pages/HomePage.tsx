import { Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Colors from '../shared/colors';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/shared/CustomButton';

const HomePage = () => {
    const navigate = useNavigate();

    const handleVoluntarioBtn = () => {
        navigate('/voluntario');
    };

    const handleONGBtn = () => {
        navigate('/ong');
    };

    return (
        <Container
            sx={{
                textAlign: 'center',
                paddingTop: '2rem',
                color: Colors.purple,
                height: '100vh',
            }}
        >
            <Typography variant='h5' fontWeight='bold'>
                Seja muito bem vindo ao
            </Typography>
            <Typography variant='h3' fontWeight='bold'>
                Voluntarioso!
            </Typography>
            <Typography
                variant='h6'
                color={Colors.gray}
                sx={{ paddingTop: '8rem', textAlign: 'left' }}
            >
                Você é:
            </Typography>
            <Box paddingBottom={2} />
            <CustomButton
                fullWidth
                handle={handleVoluntarioBtn}
                type='contained'
                name='Voluntário(a)'
            />
            <Box paddingTop={2} />
            <CustomButton
                fullWidth
                handle={handleONGBtn}
                type='outlined'
                name='ONG'
            />
        </Container>
    );
};

export default HomePage;
