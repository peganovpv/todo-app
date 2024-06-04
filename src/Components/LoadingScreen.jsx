import React from 'react';
import { Box, CircularProgress } from '@mui/material';

function LoadingScreen() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',  
                width: '100vw',   
                backgroundColor: 'rgba(0, 0, 0, 0.1)'  
            }}
        >
            <CircularProgress />
        </Box>
    );
}

export default LoadingScreen;
