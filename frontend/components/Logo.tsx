import React from 'react';
import { Box, Typography } from '@mui/material';
import RobotIcon from '@mui/icons-material/SmartToy';

// Logo component: displays the app icon and name in the header
const Logo: React.FC = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    gap={1}
    sx={{ animation: 'fadeIn 1s cubic-bezier(0.4,0,0.2,1)' }}
  >
    <RobotIcon
      color="primary"
      fontSize="large"
      sx={{
        filter: 'drop-shadow(0 2px 8px #3182ce44)',
        transition: 'transform 0.3s',
        mr: 1,
      }}
    />
    <Typography
      variant="h5"
      fontWeight={700}
      color="#000"
      letterSpacing={1}
      sx={{ textShadow: '0 2px 8px #3182ce22' }}
    >
      AI Support
    </Typography>
  </Box>
);

export default Logo;
