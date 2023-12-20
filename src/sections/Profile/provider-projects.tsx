import { Box, Grid, Typography, IconButton, Card, CardContent, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getLocalTime } from "@/utils/helperFunctions";
import Noitems from "@/components/shared/no-items";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { project } from "@/@types/user";

interface IProps {
  projects: project[] | undefined;
  handleOpenConfirmDeleteProject?: (projectId: string) => void;
  handleOpenEdit?: (project: project) => void;
  canCrud: boolean;
}

function ProviderProjects({
  projects,
  handleOpenConfirmDeleteProject,
  handleOpenEdit,
  canCrud,
}: IProps) {
  const { t, i18n } = useTranslation();
  return (
    <>
      {projects?.length ? (
        <Grid container spacing={2} justifyContent={"space-between"}>
          {projects?.map((project: project, index: number) => (
            <Grid key={project.id} item xs={12}>
              <Grid
                container
                spacing={0}
                direction={"row"}
                justifyContent={"space-between"}
                textAlign={"left"}
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    px: 1,
                    borderRadius: 1,
                    bgcolor: canCrud ? "primary.lightest" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: canCrud ? "space-between" : "start",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color={canCrud ? "primary" : "initial"}
                  >
                    {project?.name}
                  </Typography>
                  {canCrud ? (
                    <Box>
                      <IconButton sx={{ mx: 1 }}>
                        <DeleteForeverIcon
                          onClick={() => {
                            if (handleOpenConfirmDeleteProject)
                              handleOpenConfirmDeleteProject(project?.id);
                          }}
                        />
                      </IconButton>
                      <IconButton>
                        <BorderColorIcon
                          onClick={() => {
                            if (handleOpenEdit) handleOpenEdit(project);
                          }}
                        />
                      </IconButton>
                    </Box>
                  ) : null}
                </Grid>
              </Grid>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 2, px: 1 }}>
                {t("Date")}
              </Typography>
              <Typography variant="body1" fontWeight="light" sx={{ mb: 2, px: 1 }}>
                {getLocalTime(project?.start_date).toLocaleDateString(
                  i18n.language == "en" ? "en-US" : "ar-EG",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}{" "}
                {t("To")}{" "}
                {getLocalTime(project?.end_date).toLocaleDateString(
                  i18n.language == "en" ? "en-US" : "ar-EG",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, px: 1 }}>
                {t("About project")}
              </Typography>
              <Typography variant="body1" fontWeight="light" sx={{ mb: 1, px: 1 }}>
                {project.description}
              </Typography>
              {!canCrud && index < (projects?.length-1) ? <Divider /> : null}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Noitems
          minHeight={canCrud ? 520 : 220}
          title={"No Projects yet"}
          icon={<FolderCopyIcon sx={{ color: "gray", fontSize: "4.2em" }} />}
        />
      )}
    </>
  );
}

export default ProviderProjects;
