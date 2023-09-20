import { styled } from "@mui/material/styles";
import {
  Tabs,
  Tab,
  Avatar,
  Chip,
  Typography,
  Box,
  useMediaQuery,
  Badge,
  BadgeProps,
} from "@mui/material";
import { Theme } from "@mui/material";
import { useState } from "react";
import { withStyles } from "@mui/styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "lightgray",
    color: "black",
  },
}))(Badge);

const CustomTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: "#fff",
  minHeight: 44,

  borderRadius: 10,
  "& .MuiTabs-flexContainer": {
    position: "relative",
    zIndex: 1,
  },
  "& .MuiTabs-scroller": {
    [theme.breakpoints.up("md")]: {
      padding: "0 8px",
    },
  },
  "& .MuiTabs-indicator": {
    top: 3,
    bottom: 3,
    right: 3,

    height: "auto",
    background: "none",
    "&:after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      left: 4,
      right: 4,
      bottom: 0,
      borderRadius: 8,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  transition: ".5s",
  "&:hover": {
    opacity: 1,
  },
  minHeight: 44,
  minWidth: 120,
  [theme.breakpoints.up("md")]: {
    minWidth: 120,
  },
  "& .MuiTab-wrapper": {
    color: theme.palette.text.primary,
  },
  "&.Mui-selected": {
    color: "#fff",

    "& .MuiTab-wrapper": {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  "& .MuiTab-ripple": {
    display: "none",
  },
}));
interface Tabs {
  label1: string;
  label2: string;
  label3: string;
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const HeaderTabs: React.FC<Tabs> = ({ label1, label2, label3, value, handleChange }: Tabs) => {

  return (
    <CustomTabs
      value={value}
      onChange={handleChange}
      scrollButtons
      allowScrollButtonsMobile
    >
      <CustomTab
        sx={{
          px: 3,
        }}
        label={
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
            <StyledBadge badgeContent={4} />
            <Typography>{label1}</Typography>
          </Box>
        }
      />

      <CustomTab disableRipple label={label2} />
      <CustomTab disableRipple
        sx={{
          px: 3,
        }}
        label={
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
            <StyledBadge badgeContent={6} />
            <Typography>{label1}</Typography>
          </Box>
        }
      />
    </CustomTabs>
  );
};

export default HeaderTabs;