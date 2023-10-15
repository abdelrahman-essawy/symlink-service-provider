import { Tabs, Tab,Avatar, Chip, Typography, Box,  useMediaQuery,  Badge, BadgeProps } from '@mui/material';
import { Theme } from '@mui/material';
import { useState } from "react";
import { withStyles } from "@mui/styles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  padding?: string;
}
 const CustomTabPanel = function (props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: props.padding || 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default CustomTabPanel;