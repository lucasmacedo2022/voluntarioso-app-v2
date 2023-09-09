import { Box } from '@mui/material';
import { ONG } from '../../models/ONG';
import ONGSingle from './ONGSingle';

interface IVoluntarioList {
    ongList: ONG[];
    volunteerId: number;
}

const ONGList = ({ ongList, volunteerId }: IVoluntarioList) => {
    return (
        <Box paddingBottom={5}>
            {ongList?.map((ong) => (
                <ONGSingle key={ong.id} ong={ong} volunteerId={volunteerId} />
            ))}
        </Box>
    );
};

export default ONGList;
