import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Card, CardContent, CardHeader, Dialog,  IconButton, FormControl, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import LoadingButton from '@mui/lab/LoadingButton';

import { useFormik } from "formik";
import * as Yup from "yup";
import StyledTextarea from "../StyledTextArea";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import UploadFileIcon from "@mui/icons-material/UploadFile";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",

  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose }: any) {
  const { t } = useTranslation();
  const [file, setFile] = React.useState({ name: "Choose File" });
  const [loading, setLoading] = React.useState(false);
  const update = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    handleClose();
  };
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
      <Dialog
        maxWidth="xs"
        sx={{ whiteSpace: "nowrap", }}
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 2.5 } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <Card sx={{ overflowY: 'auto' }}>
          <CardHeader sx={{ p: 0, m: 0 }}
            action={
              <HighlightOffRoundedIcon
                onClick={handleClose}
                sx={{
                  position: "relative",
                  transform: 'translate(-100%, 80%)',
                  color: "#C4C4C4",
                  cursor: "pointer",
                }}
              />
            }
          />
          <Typography
            sx={{ textAlign: "center", mt: 2 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {t("Create ticket")}
          </Typography>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  px: 4,
                  gap: 1,
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <FormControl fullWidth >

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
                </FormControl>
                <FormControl fullWidth >
                  <TextField
                    id="title"
                    multiline
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    rows="3"
                    name="message"

                    type="text"
                    placeholder={t("Description") || "Description"}
                    InputProps={{

                      sx: {
                        p: 0,
                        borderRadius: '10px', // Set the desired border radius
                      },// Set the desired border radius

                    }}


                  />
                </FormControl>

                <Button
                  component="label"
                  endIcon={<Typography sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: { md: '15px !important', xs: '14px !important' } }}>{`${file.name}`}</Typography>}
                  variant="text"
                  size="small"
                >
                  <UploadFileIcon color="warning" sx={{ ml: '-15px' }} />
                  <input type="file" onChange={handleFileSelect} hidden />
                </Button>


                <FormControl fullWidth >

                   <LoadingButton 
                    size="large"
                    color="warning"
                    onClick={update}
                    loading={loading}
                    sx={{ mt: 3, borderRadius: "50px" }}
                    type="submit"
                    variant="contained"
                  >
                    {t("Send")}
                  </LoadingButton>
                </FormControl>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
}
