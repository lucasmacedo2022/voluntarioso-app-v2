import { Box, Button, Typography } from '@mui/material';
import Colors from '../../../shared/colors';
import { Link } from 'react-router-dom';

const ProjectInfo = () => {
    return (
        <div>
            <Box
                sx={{ backgroundColor: `${Colors.blue}` }}
                paddingY={4}
                paddingX={2}
                borderRadius={5}
            >
                <Typography variant='h5' color='white' fontWeight='bold'>
                    Adicione sua ideia!
                </Typography>
            </Box>
            <Box
                component='img'
                paddingY={2}
                sx={{
                    width: '100%',
                    height: '100%',
                }}
                src={`${process.env.PUBLIC_URL}/assets/image1.png`}
            />
            <Box padding={2} color={Colors.blue} marginBottom={2}>
                <Typography
                    variant='h6'
                    color={Colors.purple}
                    paddingBottom={2}
                >
                    Causa
                </Typography>
                <Typography
                    variant='body1'
                    lineHeight={1.5}
                    textAlign={'justify'}
                >
                    Aqui você pode oferecer suas melhores habilidades como forma
                    de fortalecimento de causas sociais, gerando assim novos
                    projetos incríveis que poderão contar com outros voluntários
                    que tenham sinergia! Para isto, basta responder algumas
                    perguntinhas.
                </Typography>
            </Box>
            <Box paddingTop={3}>
                <Link to='/voluntario/home/new-projects/add'>
                    <Button
                        fullWidth
                        variant='contained'
                        size='large'
                        sx={{
                            backgroundColor: `${Colors.purple}`,
                            color: 'white',
                            '&:hover': { backgroundColor: `${Colors.purple}` },
                            borderRadius: '15px',
                            height: '3rem',
                        }}
                    >
                        Quero criar uma nova causa!
                    </Button>
                </Link>
            </Box>
        </div>
    );
};

export default ProjectInfo;
