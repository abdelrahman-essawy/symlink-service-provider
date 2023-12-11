import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationPopup(props: any) {
  const { message, confirmFuntion, open, setOpen, title,BtnTitle } = props;
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box >
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert"
      
      >
        <IconButton onClick={handleClose} sx={{ position: "absolute", top: 15 ,right:6,zIndex:2}}>
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            borderRadius: "26px",
            height: 253,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <DialogTitle>
              <Typography fontSize={"20px"} fontWeight={600} color="initial">
                {title}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert" textAlign={"center"}>{message}</DialogContentText>
            </DialogContent>
            <DialogActions
            sx={{
              width: "100%",
            }}
            >
              <Button
                variant="contained"
                color="warning"
                sx={{ borderRadius: 8, p: 1.7, width: "50%",mx:1 }}
                onClick={handleClose}
              >
                {t("Cancel")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 8, p: 1.7, width: "50%",color:"#fff",mx:1 }}
                onClick={(event: any) => {
                  confirmFuntion(event);
                }}
              >
                {BtnTitle || t("Confirm")}
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
