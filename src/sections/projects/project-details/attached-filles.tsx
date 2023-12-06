import { Box, Button, Container, Grid, Typography, Tooltip, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { usePageUtilities } from "@/hooks/use-page-utilities";
import useAlert from "@/hooks/useAlert";
import { DataTable } from "@/components/shared/DataTable";
import { useProject } from "@/hooks/use-project";
import { IProject } from "@/@types/project";
import { useRouter } from "next/navigation";
import { getLocalTime, showErrorMessage } from "@/utils/helperFunctions";
import ProjectStatusBadge from "@/sections/projects/project-status";
import { CardTableActions } from "@/sections/projects/Project-table-actions";
import { useAuth } from "@/hooks/use-auth";
import EditIcon from "@/assets/icons/editIcon";
import EyeIcon from "@/assets/icons/eyeIcon";
import TrashIcon from "@/assets/icons/trashIcon";
import RoleBasedRender from "@/hocs/RoleBasedRender";
import { dictionary } from "@/configs/i18next";
import UploadButton from "@/components/shared/upload-button";
import axiosClient from "@/configs/axios-client";
function AttachedFilles({ projectId }: { projectId: any }) {
  const { i18n } = useTranslation();
  const { push } = useRouter();
  const auth = useAuth();
  const projectContext = useProject();
  const { showAlert, renderForAlert } = useAlert();
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [selectedFileId, setSelectedFileId] = useState<string>("");
  const [showView, setShowView] = useState(false);
  const [editMood, setEditMode] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { t } = useTranslation();
  const headers = [
    { text: "name", value: "name" },
    { text: "Type", value: "type" },
    { text: "Date added", value: "created_at" },
    { text: "Commitment", value: "Commitment" },
    { text: "Actions", value: "Actions" },
  ];
  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller, setController } =
    usePageUtilities();

const fetchAttachedFiles = async() => {
await  projectContext?.fetchAttachedFile(controller?.page,controller?.rowsPerPage,projectId);
};

  useEffect(() => {
    fetchAttachedFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);

  const handleEditFile = (File: any) => {
    setRecord(File);
    setEditMode(true);
    setOpen(true);
  };
  const handleDeleteFile = (FileId: string) => {
    setSelectedFileId(FileId);
    setOpenConfirm(true);
  };
  const DeleteFile = () => {
    setOpenConfirm(false);
    projectContext?.DeleteFile(selectedFileId);
    showAlert(t("File has been deleted successfully").toString(), "success");
  };
  const handleViewFile = (File: any) => {
    setRecord(File);
    setShowView(true);
  };
  const handleSorting = (sortingObj: any) => {
    setController({
      ...controller,
      OrderBy: sortingObj,
    });
  };
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
          fetchAttachedFiles();
        } 
        
      } catch (error) {
        console.log(showErrorMessage(error));
        showAlert(`${showErrorMessage(error)}`, "error");
      }
    }
    //Reset input fields
    event.target.value = "";
    setLoading(false);
  };
  const additionalTableProps = {
    onRenderActions: (file: any) => (
      <Box sx={{ display: "flex", gap: 0, alignItems: "baseline" }}>
        <Tooltip arrow placement="top" title="Show details">
          <IconButton onClick={() => console.log(file)}>
            <EyeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top" title="Delete">
          <IconButton onClick={() => console.log(file)}>
            <TrashIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  };
  return (
    <>
      <Grid container sx={{ my: 2 }}>
        <RoleBasedRender componentId="button-request-to-review">
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
            <Button variant="contained" color="warning" sx={{ borderRadius: 8 }}>
              {"Submit to review"}
            </Button>
          </Grid>
        </RoleBasedRender>

        <RoleBasedRender componentId="button-upload-file">
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
          <UploadButton loading={loading} handleFileUpload={handleFileUpload} btnTitle="Upload file" />
          </Grid>
        </RoleBasedRender>
      </Grid>
      <DataTable
        headers={headers}
        name="AttachedFilles"
        items={projectContext?.files}
        totalItems={projectContext?.count}
        totalPages={projectContext?.totalPages}
        page={controller?.page || 1}
        rowsPerPage={controller?.rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        {...additionalTableProps}
      />
      {renderForAlert()}
    </>
  );
}

export default AttachedFilles;
