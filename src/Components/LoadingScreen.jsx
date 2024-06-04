import React from 'react';
import { Box, CircularProgress } from '@mui/material';

function LoadingScreen() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',  // Full view height to center vertically in the viewport
                width: '100vw',   // Full view width to center horizontally in the viewport
                backgroundColor: 'rgba(0, 0, 0, 0.1)'  // Optional: Screen dimming
            }}
        >
            <CircularProgress />
        </Box>
    );
}

export default LoadingScreen;
