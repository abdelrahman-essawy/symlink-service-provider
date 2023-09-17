import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import StyledTextarea from "../StyledTextArea";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import UploadFileIcon from '@mui/icons-material/UploadFile';
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",

  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};


export default function BasicModal({ open, handleClose }: any) {
  const { t } = useTranslation();
  const [file, setFile] = React.useState({ name: 'Choose File' });

  // handle file selection
  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <HighlightOffRoundedIcon
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: "30px",
              top: "30px",
              color: "#C4C4C4",
              cursor: "pointer",
            }}
          />
          <Typography
            sx={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {t("Create ticket")}
          </Typography>
          <Box sx={{ m: 2, mt: 5 }}>
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "flex-start",
                }}
              >
                <TextField
                  id="title"
                  type="text"
                  placeholder={t("Title") || "Title"}
                  inputProps={{
                    step: 300,
                    style: {
                      padding: "8px 0 8px 8px",
                      fontFamily: "Roboto",
                      fontSize: "14px",
                    },
                  }}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  name="title"
                />
                <StyledTextarea
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  name="message"
                  minRows={5}
                  placeholder={t("ContactUs_Page.Your message")}
                />

                <Button
                  component="label"
                  endIcon={<Typography variant="subtitle2">{`${file.name}`}</Typography>}
                  variant="text"
                  size="large"
                >
                  <UploadFileIcon color="warning" />
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    hidden
                  />
                </Button>

                <Button
                  size="large"
                  color="warning"
                  sx={{ mt: 3, borderRadius: "50px" }}
                  type="submit"
                  variant="contained"
                >
                  {t("Send")}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
