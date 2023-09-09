import { Dialog, Typography } from '@mui/material';
import Colors from '../../shared/colors';
import CustomButton from './CustomButton';

interface ICustomAlertDialogRegisterProject {
    handleClose: () => void;
    open: boolean;
}

export default function CustomAlertDialogRegisterProject({
    handleClose,
    open,
}: ICustomAlertDialogRegisterProject) {
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
                    Ideia de projeto adicionado com sucesso
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
