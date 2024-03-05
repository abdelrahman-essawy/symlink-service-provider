import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent, CardHeader, Dialog,  IconButton, FormControl, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import LoadingButton from '@mui/lab/LoadingButton';

import { useFormik } from "formik";
import * as yup from "yup";
import StyledTextarea from "../StyledTextArea";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useSupportTicket } from "@/contexts/support-context";
import { showErrorMessage } from "@/utils/helperFunctions";
import axiosClient from "@/configs/axios-client";
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

const validationSchema = yup.object({
  subject : yup.string().required("subject Required"),
  description  : yup.string().required("description Required"),
  file: yup.string().nullable(),
});
export default function BasicModal({ open, handleClose,showMessage }: any) {
  const { t } = useTranslation();
  const [selectedFile, setFile] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);
  const [upload, setUpload] = React.useState(false);
  const supportContext = useSupportTicket();
  const update = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1600));

    setLoading(false);
    handleClose();
  };
  const uploading = async () => {
    setUpload(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setUpload(false);
    
  };
  // handle file selection
  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const formik = useFormik({
    initialValues: {
      subject: "",
      description: "",
      file: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("first")
      const formData = new FormData();
      formData.set("subject", values?.subject);
      formData.set("description", values?.description);
      formData.set("file", selectedFile);
      try {
        await axiosClient.post(`/support-ticket`,formData,{headers:{
          "Content-Type": "application/multipart" 
        }});
        showMessage("Your support ticket has been successfully sent! 🚀", "success");
        formik.resetForm();
        handleClose();
      } catch (error) {
        showMessage(showErrorMessage(error).toString(), "error");
      }
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
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <FormControl fullWidth >

                  <TextField
                    id="subject"
                    type="text"
                    helperText={formik.touched.subject && formik.errors.subject}
                    error={!!(formik.touched.subject && formik.errors.subject)}
                    onBlur={formik.handleBlur}
                    placeholder={t("Title") || "Title"}
                    inputProps={{
                      step: 300,
                      style: {
                        padding: "8px 0 8px 8px",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                      },
                    }}
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    name="subject"
                  />
                </FormControl>
                <FormControl fullWidth >
                  <TextField
                    id="description"
                    multiline
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    rows="3"
                    name="description"
                    helperText={formik.touched.description && formik.errors.description}
                    error={!!(formik.touched.description && formik.errors.description)}
                    onBlur={formik.handleBlur}
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
                <FormControl  sx={{bgcolor: 'primary.lightest', borderRadius: '10px'}}>

                <LoadingButton
                  component="label"
                  loading={upload}
                  sx={{px:2,}}
                  onChange={uploading}
                  startIcon={<Typography sx={{mx:1, fontSize: { md: '15px !important', xs: '14px !important' } }}>{`${selectedFile?.name ?? 'Choose File'}`}</Typography>}
                  variant="text"
                  size="small"
                >
                  <UploadFileIcon color="warning" sx={{ ml: '-15px' }} />
                  <input type="file" onChange={handleFileSelect} hidden />
                </LoadingButton>
                  </FormControl>


                <FormControl fullWidth >

                   <LoadingButton 
                    size="large"
                    type="submit"
                    color="warning"
                    loading={loading}
                    sx={{ mt: 3, borderRadius: "50px" }}
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
