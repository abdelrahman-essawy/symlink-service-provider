import { TextField } from "@mui/material";

interface IProps {value: string}

function MultilineTypography({value}: IProps) {
  return (
    <>
      <TextField
        sx={{
          direction: "rtl",
          "& .MuiInputBase-root ,& .MuiInputBase-input,& .MuiFilledInput-input,& .Mui-disabled": {
            fontSize:16,
            borderRadius: "0px !important",
            padding: "0px !important",
            border: "none",
            color: "#000  !important",
          },
          "&  .muirtl-w5cbyv-MuiInputBase-input-MuiFilledInput-input.Mui-disabled ,& .MuiInputBase-input,& .MuiFilledInput-input,& .Mui-disabled ":
            {
              fontSize:16,
              opacity: 1,
              "-webkit-text-fill-color": "#000",
            },
            "&  textarea": {
            fontSize:16,
            opacity: 1,
            "-webkit-text-fill-color": "#000 !important",
          },
        }}
        fullWidth
        value={value || " - "}
        multiline
        minRows={1}
        maxRows={7}
        disabled
      />
    </>
  );
}

export default MultilineTypography;
