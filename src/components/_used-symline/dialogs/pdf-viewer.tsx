import * as React from "react";
import { useTranslation } from "react-i18next";
import { Dialog } from "@mui/material";
import { Viewer, Worker,SpecialZoomLevel, ViewMode } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { TextDirection } from "@react-pdf-viewer/core";
import { zoomPlugin } from '@react-pdf-viewer/zoom';
// Import styles
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { useMediaQuery,Theme } from "@mui/material";
export default function ViewerPdf({ open, handleClose, document }: any) {
  const { t } = useTranslation();
  const islarge = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const zoomPluginInstance = zoomPlugin();
  const PageFit = SpecialZoomLevel.PageFit
  return (
    <div>
      <Dialog
        maxWidth={islarge ? "md" : "xs"}
        sx={{ whiteSpace: "nowrap" }}
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 0 } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
          <Viewer
            theme={{
              direction: TextDirection.LeftToRight,
            }}
            fileUrl={document}
            plugins={[zoomPluginInstance,defaultLayoutPluginInstance]}
            onZoom={()=>'100%'}
            defaultScale={islarge?1:PageFit}
          />
        </Worker>
      </Dialog>
    </div>
  );
}
