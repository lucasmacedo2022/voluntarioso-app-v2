import { Box, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import Colors from '../../shared/colors';

interface ICustomInput {
    labelName: string;
    placeholder: string;
    value: string;
    name: string;
    type: 'text' | 'email' | 'password' | 'date';
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInputCPF = ({
    labelName,
    placeholder,
    value,
    type,
    name,
    onChange,
}: ICustomInput) => {
    return (
        <Box paddingY={1}>
            <Typography color={Colors.gray} paddingBottom={1}>
                {labelName}
            </Typography>
            <input
                style={{
                    padding: '10px 20px',
                    width: '100%',
                    height: '44px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
                    border: '0px solid rgba(0, 0, 0, 0.25)',
                    outline: 0,
                    color: `${Colors.gray}`,
                }}
                maxLength={11}
                type={type}
                className='placeholder-color'
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
        </Box>
    );
};

export default CustomInputCPF;
