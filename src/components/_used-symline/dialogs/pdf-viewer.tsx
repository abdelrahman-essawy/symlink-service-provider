import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from 'react';
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from "formik";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as Yup from "yup";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { Checkbox, TextField, FormControlLabel, Dialog, Grid, Card, CardContent, CardHeader } from "@mui/material";
// Import the styles
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { TextDirection } from '@react-pdf-viewer/core';

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

export default function ViewerPdf({ open, handleClose, document }: any) {
  const { t } = useTranslation();
  const [pdfUrl, setPdfUrl] = useState('');
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  /*  useEffect(() => {
     const fetchPdf = async () => {
       
       //const url = {data: "https://www.africau.edu/images/default/sample.pdf"}; 
 
       try {
         const response = await fetch(file);
         const blob = await response.blob();
         const blobUrl = URL.createObjectURL(blob);
         setPdfUrl(blobUrl);
       } catch (error) {
         console.error('Error loading PDF:', error);
       }
     };
 
     fetchPdf();
   }, []);
   */


  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values:any) => {
      console.log(values);
    },
  });

  return (
    <div>
      <Dialog
       maxWidth="xl"
        sx={{ whiteSpace: "nowrap", }}
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 2.5} }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >





<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
              <Viewer
                  theme={{
                    direction: TextDirection.RightToLeft,
                }}
                fileUrl={document}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
      </Dialog>
    </div>
  );
}


