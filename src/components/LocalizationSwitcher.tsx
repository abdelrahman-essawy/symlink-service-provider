import i18n from "@/configs/i18next";
import { Avatar, Direction, IconButton } from "@mui/material";
import { languages } from "@/configs/i18next";
import { createTheme } from "@/theme";
import axiosClient from "@/configs/axios-client";
const LocalizationSwitcher = () => {
  const theme = createTheme(document.dir == "rtl" ? "rtl" : "ltr");
  // const [currentLanguage, setcurrentLanguage] = useState(i18n.language);
  const changeLanguage = (value: any) => {
    i18n.changeLanguage(value.code);
    document.dir = value.dir;
    sessionStorage.setItem("direction", value.dir);
    sessionStorage.setItem("language", value.code);
    axiosClient.defaults.headers.common['Accept-Language'] = value.code;
  };
  return (
    <>
      {languages.map((language, index) => {
        return (
          i18n.language == language.code || (
            <IconButton
              key={index}
              aria-label="upload picture"
              component="label"
              onClick={() => changeLanguage(language)}
              size={"small"}
              sx={{ all:"unset",display: "flex", justifyContent: "center", alignItems: "center", border: "1.6px solid blue",borderRadius:"50%" }}
            >
              <Avatar
                sx={{
                  background: "transparent",
                  color: "black",
                  width: 30,
                  height: 30,
                  margin:"auto",
                  padding:"0"
                }}
              >
                {language.letter}
              </Avatar>
            </IconButton>
          )
        );
      })}
    </>
  );
};

export default LocalizationSwitcher;
