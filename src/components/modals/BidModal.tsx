import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Checkbox, FormControlLabel } from "@mui/material";

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
            {t("Put your bid")}
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
                <InputLabel>{t("Pick duration")}</InputLabel>
                <FormControl sx={{ mb: 1, width: "90%" }}>
                  <Select
                    sx={{ borderRadius: "50px" }}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>{t("Pick duration")}</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>

                <InputLabel>{t("Put your price")}</InputLabel>
                <FormControl fullWidth sx={{ mb: 1, width: "90%" }}>
                  <OutlinedInput
                    sx={{ borderRadius: "50px" }}
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={t("Put your deal as anonymous")}
                />
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
