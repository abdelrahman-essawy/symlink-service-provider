import * as React from "react";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import DownloadIcon from "@mui/icons-material/Download";
import Box from "@mui/material/Box";
import { Dialog, Card, CardContent, CardHeader } from "@mui/material";
import Image from "next/image";

export default function ViewImagesDialog({ open, handleClose, imageLink }: any) {
  const { t } = useTranslation();

  return (
    <div>
      <Dialog
        maxWidth="sm"
        sx={{ whiteSpace: "nowrap" }}
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 2.5 } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Card sx={{ overflowY: "auto" }}>
          <CardHeader
            sx={{ p: 0, m: 0 }}
            action={
              <>
                <HighlightOffRoundedIcon
                  color="warning"
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 7,
                    right: 7,
                    zIndex: 12,
                    transition: "opacity .3s",
                    opacity: 0.6,
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                />
                <DownloadIcon
                  color="warning"
                  onClick={() => {
                    window.open(imageLink, "_blank");
                  }}
                  sx={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 35,
                    right: 7,
                    zIndex: 12,
                    transition: "opacity .3s",
                    opacity: 0.6,
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                />
              </>
            }
          />
          <CardContent>
            <Box
              minHeight="500px"
              sx={{
                display: "flex",
                flexDirection: "column",
                px: 4,
                borderRadius: 2,
                gap: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image alt={"image"} src={imageLink} fill />
            </Box>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
}
