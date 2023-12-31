import { Box, Button, Grid, Tooltip, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAlert from "@/hooks/useAlert";
import { DataTable } from "@/components/shared/DataTable";
import { useProject } from "@/hooks/use-project";
import { getLocalTime, showErrorMessage } from "@/utils/helperFunctions";
import EyeIcon from "@/assets/icons/eyeIcon";
import TrashIcon from "@/assets/icons/trashIcon";
import RoleBasedRender from "@/hocs/RoleBasedRender";
import UploadButton from "@/components/shared/upload-button";
import axiosClient from "@/configs/axios-client";
import ViewerPdf from "@/components/_used-symline/dialogs/pdf-viewer";
import ViewImagesDialog from "@/components/_used-symline/dialogs/view-images";
import ConfirmationPopup from "@/components/confirmation-popup";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import PhotoIcon from "@mui/icons-material/Photo";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Noitems from "@/components/shared/no-items";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { useAuth } from "@/hooks/use-auth";

export interface IProps {
  RefreshAttachedFiles: () => void;
  projectId: any;
  handlePageChange: (event: any, newPage: number) => void;
  handleRowsPerPageChange: (event: any) => void;
  controller: any;
  userId: string | undefined ;
  attachedFiles?: any[];
}

function AttachedFilles({
  RefreshAttachedFiles,
  projectId,
  controller,
  handlePageChange,
  handleRowsPerPageChange,
  attachedFiles,
  userId,
}: IProps) {
  const projectContext = useProject();
  const { showAlert, renderForAlert } = useAlert();

  const [selectedFileId, setSelectedFileId] = useState<string>("");

  const { t } = useTranslation();
  const headers = [
    { text: "name", value: "name" },
    { text: "Type", value: "type" },
    { text: "Date added", value: "created_at" },
    { text: "Actions", value: "Actions" },
  ];

  const auth = useAuth();
  const [openCertificate, setOpenCertificate] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [fileLink, setFileLink] = useState<null | string>(null);
  const [confirm, setConfirm] = useState(false);
  const handleCloseConfirm = () => setConfirm(false);

  const handleClosefile = () => setOpenCertificate(false);

  const handleOpenfile = (imageLink: string) => {
    setFileLink(imageLink);
    setOpenCertificate(true);
  };
  const handleClosePdf = () => setOpenPdf(false);
  const handleOpenPdf = (pdfLink: string) => {
    setFileLink(pdfLink);
    setOpenPdf(true);
  };

  const handleDeleteFile = (FileId: string) => {
    setSelectedFileId(FileId);
    setConfirm(true);
  };
  const DeleteFile = useCallback(
    async () => {
      try {
        await axiosClient.delete(`/attached-files/${selectedFileId}`);
        showAlert("attachedfiles deleted successfully", "success");
        RefreshAttachedFiles();
      } catch (error) {
        showAlert(showErrorMessage(error).toString(), "error");
      }
      setConfirm(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedFileId]
  );

  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = event.target.files?.[0];
    if (file) {
      // Call your API endpoint to post the file data
      const formData = new FormData();
      formData.set("multi_RFP_id", projectId);
      formData.set("file", file);
      formData.set("name", file?.name);
      try {
        const res = await axiosClient.post("/attached-files", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status == 201 || res.status == 200) {
          showAlert("File uploaded successfully", "success");
          RefreshAttachedFiles();
        }
      } catch (error) {
        showAlert(`${showErrorMessage(error)}`, "error");
      }
    }
    //Reset input fields
    event.target.value = "";
    setLoading(false);
  };

  const handelRenderFiles = useCallback((file: any) => {
    if (typeof file?.type === "string") {
      if (file?.type?.includes("application/pdf")) {
        handleOpenPdf(file?.url);
      } else if (file?.type?.includes("image")) {
        handleOpenfile(file?.url);
      } else {
        //open the file outside
        window.open(file?.url, "_blank");
      }
    }
  }, []);

  const additionalTableProps = {
    onRendercreated_at: (item: any) =>
      getLocalTime(item.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
    onRenderActions:
      userId === auth?.user?.id
        ? (file: any) => (
            <Box sx={{ display: "flex", gap: 0, alignItems: "baseline" }}>
              <Tooltip arrow placement="top" title="View files">
                <IconButton onClick={() => handelRenderFiles(file)}>
                  <EyeIcon />
                </IconButton>
              </Tooltip>

              <Tooltip arrow placement="top" title="Delete">
                <IconButton onClick={() => handleDeleteFile(file?.id)}>
                  <TrashIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )
        : (file: any) => (
            <Box sx={{ display: "flex", gap: 0, alignItems: "baseline" }}>
              <Tooltip arrow placement="top" title="View files">
                <IconButton onClick={() => handelRenderFiles(file)}>
                  <EyeIcon />
                </IconButton>
              </Tooltip>
            </Box>
          ),
    onRendertype: useCallback((file: any) => {
      if (file?.type?.includes("image")) {
        return (
          <Tooltip arrow title={file.type} placement="top">
            <PhotoIcon color="primary" />
          </Tooltip>
        );
      } else if (file?.type?.includes("application/pdf")) {
        return (
          <Tooltip arrow title={file.type} placement="top">
            <PictureAsPdfIcon color="primary" />
          </Tooltip>
        );
      } else {
        return (
          <Tooltip arrow title={file.type} placement="top">
            <FilePresentIcon color="primary" />
          </Tooltip>
        );
      }
    }, []),
  };
  return (
    <>
      <Grid container sx={{ my: 2 }}>
        <RoleBasedRender componentId="button-upload-file">
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
            <UploadButton
              loading={loading}
              handleFileUpload={handleFileUpload}
              btnTitle="Upload file"
            />
          </Grid>
        </RoleBasedRender>
        <ViewerPdf open={openPdf} handleClose={handleClosePdf} document={fileLink} />
        <ViewImagesDialog
          open={openCertificate}
          handleClose={handleClosefile}
          imageLink={fileLink}
        />
        <ConfirmationPopup
          open={confirm}
          handleClose={handleCloseConfirm}
          message={t("Are you sure you want to delete this file ?")}
          title={t("Delete Attach file")}
          confirmFuntion={DeleteFile}
          setOpen={setConfirm}
        />
      </Grid>
      {projectContext?.countFiles == undefined || projectContext?.countFiles > 0 ? (
        <DataTable
          headers={headers}
          name="AttachedFilles"
          items={attachedFiles}
          totalItems={projectContext?.countFiles}
          totalPages={projectContext?.totalPages}
          page={controller?.page || 1}
          rowsPerPage={controller?.rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          {...additionalTableProps}
        />
      ) : (
        <Noitems
          title={"No Files yet"}
          icon={<FolderCopyIcon sx={{ color: "gray", fontSize: "4.2em" }} />}
        />
      )}
      {renderForAlert()}
    </>
  );
}

export default AttachedFilles;
