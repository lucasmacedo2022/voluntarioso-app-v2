import { Box, Typography } from '@mui/material';
import { cpf } from 'cpf-cnpj-validator';
import moment from 'moment';
import { Voluntario } from '../../../models/Voluntario';
import Colors from '../../../shared/colors';

interface IONGCandidatoSingle {
    candidato: Voluntario;
    selectCandidatoId: (volunId: number) => void;
}

const ONGCandidatoSingle = ({
    candidato,
    selectCandidatoId,
}: IONGCandidatoSingle) => {
    return (
        <div
            onClick={() => {
                selectCandidatoId(candidato.volunId);
            }}
            className='boxONGVoluntario'
            style={{
                border: `1px solid ${Colors.blue}`,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: 150,
                cursor: 'pointer',
                margin: '0.5rem 0',
            }}
        >
            <Box width={100}>
                <Box
                    component='img'
                    paddingY={4}
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                    src={`${process.env.PUBLIC_URL}/assets/user.png`}
                />
            </Box>
            <Box>
                <div
                    key={candidato.volunId}
                    className='boxONGVoluntarioText'
                    style={{
                        cursor: 'pointer',
                        textAlign: 'right',
                    }}
                >
                    <Typography variant='h6'>{candidato.volunName}</Typography>
                    <Typography variant='body2'>
                        {candidato.volunEmail}
                    </Typography>
                    <Typography variant='body2'>
                        {cpf.format(candidato.volunCPF)}
                    </Typography>
                    <Typography variant='body2'>
                        {moment(new Date(candidato.volunBirthDate)).format(
                            'DD/MM/YYYY'
                        )}
                    </Typography>
                </div>
            </Box>
        </div>
    );
};

export default ONGCandidatoSingle;
