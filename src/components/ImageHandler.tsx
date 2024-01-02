import { FilledInput, InputLabel, Typography, IconButton, CircularProgress, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ApkAttachment } from "@/@types/project";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
interface ImageHandlerProps {
  input: { name: string; label?: string; placeholder: string; type: string; required: boolean };
  handleFileSelect: any;
  styles: any;
  selectedFile?: string | Blob;
  error?: string | null;
  loading?: boolean;
  uploaded?: boolean;
  apk_attachment: ApkAttachment;
}

export const ImageHandler: React.FC<ImageHandlerProps> = ({
  input,
  handleFileSelect,
  styles,
  selectedFile,
  error,
  loading,
  uploaded,
  apk_attachment,
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
        endAdornment={
          uploaded ? (
            <IconButton aria-label="success">
              <CheckCircleIcon color="success" />
            </IconButton>
          ) : loading ? (
            <IconButton aria-label="Progress">
              <CircularProgress thickness={1.5} size={30} />
            </IconButton>
          ) : null
        }
        startAdornment={
          apk_attachment ? (
           <Tooltip title={apk_attachment?.file_name}>
             <IconButton
               sx={{
                 mr:2,
                 width: 50,
               }}
               aria-label="apk_attachment download"
               onClick={() => {
                 window.open(apk_attachment?.file_url, "_blank");
               }}
             >
               <CloudDownloadIcon color="success" />
             </IconButton>
           </Tooltip>
          ) : null
        }
      />
      {error && (
        <Typography sx={{ mx: 3 }} color={"error"} variant="caption">
          {error}
        </Typography>
      )}
      {}
    </>
  );
};
