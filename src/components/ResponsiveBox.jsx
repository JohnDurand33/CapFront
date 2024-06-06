import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import React from 'react'

const ResponsiveBox = ({ children, sx, props }) => {
    const theme = useTheme();

    return (
        <Box {...props}
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.palette.background.main,
                color: theme.palette.primary.contrastText,
                borderRadius: 2,
                boxShadow: 6,
                zIndex: -5,
                ...sx
            }}>{children}</Box>
    )
}

export default ResponsiveBox