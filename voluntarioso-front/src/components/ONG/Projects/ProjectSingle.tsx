import { Box, Button, Icon, Typography } from '@mui/material';
import Colors from '../../../shared/colors';
import { Project } from '../../../models/Project';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface IProjectSingle {
    project: Project;
}

const ProjectSingle = ({ project }: IProjectSingle) => {
    const [likeCount, setLikeCount] = useState<number>(0);

    const handleClick = () => {
        setLikeCount((prevState) => prevState + 1);
    };

    return (
        <div
            style={{
                border: `1px solid ${Colors.blue}`,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                margin: '0.5rem 0',
            }}
        >
            <Box width={100}>
                <>
                    <Button
                        variant='contained'
                        color='error'
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '35px',
                            height: '60px',
                            borderRadius: '50%',
                            textAlign: 'center',
                        }}
                        onClick={handleClick}
                    >
                        <Icon component={FavoriteIcon} fontSize='large' />
                    </Button>
                    <Box paddingTop={1} />
                    <Typography variant='body1'>Likes: {likeCount}</Typography>
                </>
            </Box>
            <Box
                sx={{
                    width: '150px',
                }}
            >
                <div
                    key={project.id}
                    style={{
                        textAlign: 'right',
                        color: '#932186',
                    }}
                >
                    <Typography variant='h6'>{project.name}</Typography>
                    <Typography variant='body2' paddingY={1}>
                        Categoria: {project.category}
                    </Typography>
                    <Typography variant='body2' paddingY={1}>
                        Objetivo: {project.goal}
                    </Typography>
                    <Typography variant='body2' paddingY={1}>
                        Expertise: {project.expertise}
                    </Typography>
                    <Typography variant='body2' paddingY={1}>
                        Infraestrutura: {project.infrastructure}
                    </Typography>
                </div>
            </Box>
        </div>
    );
};

export default ProjectSingle;
