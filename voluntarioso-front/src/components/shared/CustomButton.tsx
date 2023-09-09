import { Button } from '@mui/material';

interface ICustomButton {
    handle: () => void;
    type: 'contained' | 'outlined';
    name: string;
    fullWidth: boolean;
    size?: 'large';
}

const CustomButton = ({
    handle,
    type,
    name,
    fullWidth,
    size,
}: ICustomButton) => {
    return (
        <Button
            size={size}
            onClick={handle}
            variant={type}
            fullWidth={fullWidth}
            sx={{ borderRadius: '15px', height: '3rem' }}
        >
            {name}
        </Button>
    );
};

export default CustomButton;
