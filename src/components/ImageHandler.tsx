import { FilledInput, InputLabel, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ImageHandlerProps {
  input: { name: string; label?: string; placeholder: string; type: string; required: boolean };
  handleFileSelect: any;
  styles: any;
  selectedFile?: string | Blob;
  error?:string | null;
}

export const ImageHandler: React.FC<ImageHandlerProps> = ({
  input,
  handleFileSelect,
  styles,
  selectedFile,
  error
}) => {
  const { t } = useTranslation();
  return (
    <>
      {input.label && (
        <InputLabel className={styles.inputLabel} id={input.name}>
          {t(input.label)}
        </InputLabel>
      )}
      <FilledInput
        type="file"
        onChange={handleFileSelect}
        hiddenLabel
        name={input.name}
        inputProps={{ accept: ".apk, .ipa, .hms" }} // optional: specify accepted file types
        fullWidth
        required={input.required}
      />
      {error && <Typography sx={{mx:3}} color={"error"} variant="caption">{error}</Typography>}
    </>
  );
};
