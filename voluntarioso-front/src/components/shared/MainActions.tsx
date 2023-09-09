import { Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomButton from './CustomButton';
import { AuthHelper } from '../../helpers/AuthHelper';

interface IMainActions {
    children?: JSX.Element;
}

const MainActions = ({ children }: IMainActions) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleBack = () => {
        if (
            location.pathname === '/ong/home' ||
            location.pathname === '/voluntario/home'
        )
            AuthHelper.logout();

        navigate(-1);
    };

    return (
        <div>
            <Box paddingTop={4} />
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
            >
                <CustomButton
                    type='outlined'
                    name='Voltar'
                    size='large'
                    fullWidth={false}
                    handle={handleBack}
                />
                {children}
            </Box>
            <Box paddingTop={4} />
        </div>
    );
};

export default MainActions;
