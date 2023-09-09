import CustomButton from '../../components/shared/CustomButton';
import MainActions from '../../components/shared/MainActions';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthHelper } from '../../helpers/AuthHelper';

const ProjectsPage = () => {
    const navigate = useNavigate();

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
            <Outlet />
        </div>
    );
};

export default ProjectsPage;
