import { Dialog, Typography } from '@mui/material';
import Colors from '../../shared/colors';
import CustomButton from './CustomButton';

interface ICustomAlertDialog {
    handleClose: () => void;
    open: boolean;
    type: 'Voluntário' | 'ONG';
}

export default function CustomAlertDialog({
    handleClose,
    open,
    type,
}: ICustomAlertDialog) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                sx={{
                    '.MuiPaper-root': {
                        paddingY: 3,
                        paddingX: 5,
                        borderRadius: '28px',
                    },
                }}
            >
                <Typography
                    variant='h5'
                    textAlign='center'
                    color={Colors.purple}
                >
                    Aviso
                </Typography>

                <Typography variant='h6' paddingY={5}>
                    {type === 'ONG'
                        ? 'ONG não encontrada!'
                        : 'Usuário não encontrado!'}
                </Typography>
                <CustomButton
                    handle={handleClose}
                    fullWidth={false}
                    name='OK'
                    type='contained'
                    size='large'
                />
            </Dialog>
        </div>
    );
}
