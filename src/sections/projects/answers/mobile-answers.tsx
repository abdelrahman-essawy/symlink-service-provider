import { Grid, Typography, Box, Container, Tooltip, IconButton } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { RequestForProposal } from "@/@types/project";
import MultilineTypography from "@/components/multilineTypography";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

interface IProps {
  project: RequestForProposal;
}

export default function MobileAnswers({ project }: IProps) {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        color="primary"
        sx={{ p: 1, my: 1, borderRadius: 1, bgcolor: "primary.lightest", m: 0 }}
      >
        {project?.category?.name}
      </Typography>

      <Container maxWidth={"xl"}>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 1 }}>
            {t("Target mobile application URL:")}
          </Typography>
          <MultilineTypography value={project?.target_mobile_application_url} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>
            {t("Upload mobile application file")}
          </Typography>
          {project?.apk_attachment ?
            <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title={"Download the file"}>
              <IconButton
                aria-label="apk_attachment download"
                onClick={() => {
                  window.open(project?.apk_attachment?.file_url, "_blank");
                }}
              >
                <CloudDownloadIcon color="success" />
              </IconButton>
            </Tooltip>
            <Typography variant="caption" color="initial">
              {project?.apk_attachment?.file_name}
            </Typography>
          </Box>
          :
          (<Typography>{" - "}</Typography>)}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
            {t("The approach of the assessment:")}
          </Typography>
          <MultilineTypography value={project?.approach_of_assessment} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>
            {t("Notes")}
          </Typography>
          <MultilineTypography value={project?.notes} />
        </Grid>
      </Container>
    </Box>
  );
}
