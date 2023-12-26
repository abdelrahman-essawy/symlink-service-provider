import * as React from "react";
import { SxProps } from "@mui/material/styles";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import { Grid, SvgIcon, Theme, Typography, Box } from "@mui/material";
import StyledMenu from "./StyledMenu";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Tooltip from "@mui/material/Tooltip";
import { useAuth } from "@/hooks/use-auth";
import { TActionMenuButton } from "./MenuItems";
type IMenuButtonProps = {
  actions: TActionMenuButton[];
  sx?: SxProps<Theme>;
  children: JSX.Element;
  id?: string | undefined;
  isSuspended?: boolean | undefined;
  disabled?: boolean | undefined;
  visibility?: boolean | undefined;
  menuMinWidth?: number | string;
  expandIcon?: boolean;
  onClick?: (e: any) => void;
};
const MenuButton = ({
  actions,
  sx,
  children,
  id,
  isSuspended,
  disabled,
  expandIcon = false,
  visibility = false,
  menuMinWidth = 150,
}: IMenuButtonProps) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const AuthContext = useAuth();
  const AdminID = AuthContext?.user?.role === "ADMIN" ? AuthContext?.user?.id : "";
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        sx={sx}
        style={{
          minWidth: "60px",
          visibility: visibility ? "hidden" : "visible",
          transition: "visibility .1s ease-in-out",
        }}
        endIcon={expandIcon ? open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> : null}
      >
        {children}
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            minWidth: menuMinWidth,
          },
        }}
      >
        {actions?.map((child: any, index: number) => {
          return (
            <>
              <Tooltip title={child.massage || null} placement="top">
                <Box>
                  <MenuItem
                    key={index}
                    onClick={(e) => {
                      child.onClick(e, id);
                      handleClose(e);
                    }}
                    disabled={child.disabled}
                  >
                    <Grid container alignItems="center">
                      {child.icon && (
                        <SvgIcon
                          sx={
                            child?.anothersx ? child?.anothersx : { width: "30px", height: "30px" }
                          }
                        >
                          {child.icon}
                          {child.label == "Freeze"
                            ? isSuspended == true
                              ? // <ApproveIconSVG />
                                null
                              : t(child.icon)
                            : t(child.icon)}
                        </SvgIcon>
                      )}
                      <Typography variant="body2">
                        {child.label == "Freeze"
                          ? isSuspended == true
                            ? t("Activate")
                            : t(child.label)
                          : t(child.label)}
                      </Typography>
                    </Grid>
                  </MenuItem>
                </Box>
              </Tooltip>
            </>
          );
        })}
      </StyledMenu>
    </>
  );
};

export default MenuButton;
