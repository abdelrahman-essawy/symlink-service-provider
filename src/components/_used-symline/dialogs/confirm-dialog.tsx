import * as React from "react";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from "formik";
import * as Yup from "yup";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Box from "@mui/material/Box";
import { Checkbox, TextField, FormControlLabel,CardActions,  Dialog, Card, CardContent, CardHeader, Button } from "@mui/material";

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

export default function ConfirmDialog({ open, handleClose, message }: any) {
  const { t } = useTranslation();
  const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(dayjs());
  const [dateTo, setDateTo] = React.useState<Dayjs | null>(dayjs());


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
         
          <CardContent sx={{py:2, pr:8, pb: '16px !important'}}>
            <Box >

              <Box
                sx={{
                  display: "flex",
                 
                  borderRadius: 2,
                
                
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ textAlign: "right", mt: 2 }}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  {t(message)}
                </Typography>
              </Box>

            </Box>
            <CardActions sx={{ p: 0, m: 0 ,mt: 2}}>
          <Button variant="contained" sx={{color: 'white'}} onClick={handleClose} color="primary">{t("Delete")}</Button>
          <Button variant="contained" sx={{color: 'white'}} onClick={handleClose} color="inherit" autoFocus> {t("Cancel")}</Button>
        </CardActions>
          </CardContent>
        
        </Card>
        
      </Dialog>
    </div>
  );
}


