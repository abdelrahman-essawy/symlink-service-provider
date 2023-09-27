import React, { use } from "react";
import { useTranslation } from "react-i18next";
import { Button, createTheme, ThemeProvider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const handleToggleLanguage = () => {
    const newLanguage = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLanguage);
  };

  const handleToggleDirection = () => {
    const newDirection = i18n.language === "en" ? "ltr" : "rtl";
    document.documentElement.setAttribute("dir", newDirection);
    createTheme({
      direction: newDirection,
    });
  };

  return (
    <Box     
      onClick={() => {
            handleToggleLanguage();
            handleToggleDirection();
          }}>
        <Typography
          sx={{
            border: "1px solid rgba(232,232,232, 1)",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            lineHeight: "32px",
            textAlign: "center",
            '&:hover':{
              cursor:"pointer",
            }
          }}
          variant="body1"
          color="initial"
        >
          {" "}
          {i18n.language === "en" ? "AR" : "EN"}
        </Typography>
</Box>
  );
};

export default LanguageToggle;
