import { styled } from "@mui/material/styles";
import {
  Tab,
  Typography,
  Box,
  Badge,
  Tabs,
} from "@mui/material";
import { withStyles } from "@mui/styles";

export const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "lightgray",
    color: "black",
  },
}))(Badge);

interface TabsSchema {
  tabs: {
    title: string;
    amount: number;
  }[];
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

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

const HeaderTabs: React.FC<TabsSchema> = ({ tabs, value, handleChange }: TabsSchema) => {

  return (
    <CustomTabs
      value={value}
      onChange={handleChange}
      scrollButtons
      allowScrollButtonsMobile
      sx={{
        width: "fit-content",
      }}
    >
      {
        tabs.map(({ title, amount: amount }) => (
          <CustomTab
            key={title}
            label={
              <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                gap: 2
              }}>
                <StyledBadge badgeContent={amount} />
                <Typography>{title}</Typography>
              </Box>
            }
          />
        ))
      }
    </CustomTabs>
  );
};

export default HeaderTabs;
