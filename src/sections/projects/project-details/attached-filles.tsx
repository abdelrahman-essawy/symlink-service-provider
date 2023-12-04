import { Box, Button, Container, Grid, Typography, Tooltip, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { usePageUtilities } from "@/hooks/use-page-utilities";
import useAlert from "@/hooks/useAlert";
import { DataTable } from "@/components/shared/DataTable";
import { useProject } from "@/hooks/use-project";
import { IProject } from "@/@types/project";
import { useRouter } from "next/navigation";
import { getLocalTime } from "@/utils/helperFunctions";
import ProjectStatusBadge from "@/sections/projects/project-status";
import { CardTableActions } from "@/sections/projects/Project-table-actions";
import { useAuth } from "@/hooks/use-auth";
import EditIcon from "@/assets/icons/editIcon";
import EyeIcon from "@/assets/icons/eyeIcon";
import TrashIcon from "@/assets/icons/trashIcon";
import RoleBasedRender from "@/hocs/RoleBasedRender";
import { dictionary } from "@/configs/i18next";
function AttachedFilles() {
  const { i18n } = useTranslation();
  const { push } = useRouter();
  const auth = useAuth();
  const projectContext = useProject();
  const { showAlert, renderForAlert } = useAlert();
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [showView, setShowView] = useState(false);
  const [editMood, setEditMode] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { t } = useTranslation();
  const headers = [
    { text: "name", value: "project_name" },
    { text: "Type", value: "request_for_proposal_status" },
    { text: "Date added", value: "created_at" },
    { text: "Commitment", value: "Commitment" },
    { text: "Actions", value: "Actions" },
  ];
  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller, setController } =
    usePageUtilities();

  useEffect(() => {
    if (auth?.user?.role === "PROVIDER") {
      projectContext?.fetchProjects(
        controller.page,
        controller.rowsPerPage,
        controller.SearchString
      );
    } else if (auth?.user?.role === "CLIENT") {
      projectContext?.fetchProjects(
        controller.page,
        controller.rowsPerPage,
        controller.SearchString,
        auth?.user?.id
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);

  const handleEditProject = (Project: any) => {
    setRecord(Project);
    setEditMode(true);
    setOpen(true);
  };
  const handleDeleteProject = (ProjectId: string) => {
    setSelectedProjectId(ProjectId);
    setOpenConfirm(true);
  };
  const DeleteProject = () => {
    setOpenConfirm(false);
    projectContext?.DeleteProject(selectedProjectId);
    showAlert(t("Project has been deleted successfully").toString(), "success");
  };
  const handleViewProject = (Project: IProject) => {
    setRecord(Project);
    setShowView(true);
  };
  const handleSorting = (sortingObj: any) => {
    setController({
      ...controller,
      OrderBy: sortingObj,
    });
  };
  const additionalTableProps = {
    onRendercreated_at: (item: any) =>
      getLocalTime(item.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    onRenderupdated_at: (item: any) =>
      getLocalTime(item.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    onRenderActions: (college: any) => (
      <Box sx={{ display: "flex", gap: 0, alignItems: "baseline" }}>
        <Tooltip arrow placement="top" title="Show details">
          <IconButton onClick={() => console.log(college)}>
            <EyeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top" title="Delete">
          <IconButton onClick={() => console.log(college)}>
            <TrashIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  };
  return (
    <>
      <RoleBasedRender componentId="button-request-to-review">
        <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant="contained" color="warning" sx={{ borderRadius: 8 }}>
            {"Submit to review"}
          </Button>
        </Grid>
      </RoleBasedRender>

      <RoleBasedRender componentId="button-upload-file">
        <Button variant="contained" color="warning" sx={{ borderRadius: 8, alignSelf: "center" }}>
          {dictionary("Upload file")}
        </Button>
      </RoleBasedRender>
      <DataTable
        headers={headers}
        name="AttachedFilles"
        items={projectContext?.projects}
        totalItems={projectContext?.count}
        totalPages={projectContext?.totalPages}
        page={controller?.page || 1}
        rowsPerPage={controller?.rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        {...additionalTableProps}
      />
    </>
  );
}

export default AttachedFilles;
