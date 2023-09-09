import { Box, Typography } from '@mui/material';
import categorias from '../../shared/categorias';
import Colors from '../../shared/colors';

interface ICustomInput {
    labelName?: string;
    placeholder: string;
    name: string;
    onChange: any;
    value: string;
}

const CustomSelect = ({
    labelName,
    placeholder,
    name,
    value,
    onChange,
}: ICustomInput) => {
    return (
        <Box paddingY={1}>
            {labelName !== null && (
                <Typography color={Colors.gray} paddingBottom={1}>
                    {labelName}
                </Typography>
            )}
            <select
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
                name={name}
                className='placeholder-color'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            >
                <option value='default'>selecione uma categoria</option>
                {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                        {categoria}
                    </option>
                ))}
            </select>
        </Box>
    );
};

export default CustomSelect;
