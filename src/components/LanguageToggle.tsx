import React, { use } from "react";
import { useTranslation } from "react-i18next";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "@emotion/react";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const handleToggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ar" : "en";
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
    <Button
      onClick={() => {
        handleToggleLanguage();
        handleToggleDirection();
      }}
    >
      {i18n.language === "en" ? "عربى" : "English"}
    </Button>
  );
};

export default LanguageToggle;
