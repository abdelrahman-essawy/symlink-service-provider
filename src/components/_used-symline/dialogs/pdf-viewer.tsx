import * as React from "react";
import { useTranslation } from "react-i18next";
import { Dialog } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { TextDirection } from "@react-pdf-viewer/core";

export default function ViewerPdf({ open, handleClose, document }: any) {
  const { t } = useTranslation();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div>
      <Dialog
        maxWidth="xl"
        sx={{ whiteSpace: "nowrap" }}
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 2.5 } }}
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
