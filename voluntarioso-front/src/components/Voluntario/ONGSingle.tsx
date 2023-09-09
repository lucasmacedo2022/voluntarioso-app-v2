import { Box, Typography } from '@mui/material';
import { cnpj } from 'cpf-cnpj-validator';
import { useNavigate } from 'react-router-dom';
import { ONG } from '../../models/ONG';
import Colors from '../../shared/colors';
import CustomButton from '../shared/CustomButton';

interface IONGSingle {
    ong: ONG;
    volunteerId: number;
}

const ONGSingle = ({ ong, volunteerId }: IONGSingle) => {
    const navigate = useNavigate();

    const handleDetalhe = () => {
        navigate(`ong-details/${ong.id}`, { state: { volunteerId } });
    };

    return (
        <Box
            key={ong.id}
            border={1}
            borderColor={Colors.purple}
            borderRadius={5}
            marginBottom={2}
        >
            <Box
                component='img'
                paddingBottom={2}
                sx={{
                    width: '100%',
                    height: '100%',
                }}
                src={`${process.env.PUBLIC_URL}/assets/image1.png`}
            />
            <Box
                display='flex'
                justifyContent='space-around'
                alignItems='center'
                paddingBottom={2}
            >
                <Box
                    display='flex'
                    justifyContent='space-around'
                    alignItems='left'
                    flexDirection='column'
                >
                    <Typography
                        variant='h6'
                        color={Colors.purple}
                        fontWeight='bold'
                    >
                        {ong.name}
                    </Typography>
                    <Typography variant='body1' color={Colors.blue}>
                        CNPJ: {cnpj.format(ong.cnpj)}
                    </Typography>
                    <Typography variant='body1' color={Colors.blue}>
                        Categoria: {ong.category}
                    </Typography>
                </Box>
                <Box>
                    <CustomButton
                        name='+ detalhes'
                        type='contained'
                        size='large'
                        fullWidth={false}
                        handle={handleDetalhe}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ONGSingle;
