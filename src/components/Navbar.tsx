import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Navbar: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}> {/* Custom background color */}
            <Toolbar>
                <Box display="flex" alignItems="center" width="100%">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> {/* FlexGrow pushes items to the right */}
                        Hackathon Dashboard
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
