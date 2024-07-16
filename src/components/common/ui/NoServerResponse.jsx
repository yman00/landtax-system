import { Box, Grow, Typography } from '@mui/material';
import React from 'react';
import serverErr from '../../../assets/images/server-error.svg'


const NoServerResponse = ({ show }) => {
    return (
        <Grow in={show}>
            <Box
                width="100%"
                height='80vh'
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
            >
                <img src={serverErr} style={{ width: '100%', maxWidth: '25rem' }} />
                <Typography component={'span'} variant='h4' textAlign='center' color="rgb(63,61,86)" mt={3}>No Server Response</Typography>
            </Box>
        </Grow>
    );
}

export default NoServerResponse;
