import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { RequestForProposal } from "@/@types/project";
import MultilineTypography from "@/components/multilineTypography";
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
      sx={{ p: 1, mb: 2, borderRadius: 1, bgcolor: "primary.lightest",m:0 }}
    >
      {project?.category?.name}
    </Typography>
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>
          {t("Target mobile application URL:")}
        </Typography>
        <MultilineTypography value={project?.target_mobile_application_url} />
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 1, mt: 3, display: "flex", gap: 0.5 }}
        >
          {t("Upload mobile application file")}{" "}
          <Typography variant="h6" color="initial">
            {t("(Optional)")}
          </Typography>
        </Typography>
        <MultilineTypography value={project?.apk_attachment_id} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
          {t("The approach of the assessment:")}
        </Typography>
        <MultilineTypography value={project?.approach_of_assessment} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
          {t("Is active directory part of the assessment?")}
        </Typography>
        <MultilineTypography value={project?.is_active_directory ? t("Yes") : t("No")} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>
          {t("Notes")}
        </Typography>
        <MultilineTypography value={project?.notes} />
      </Grid>
    </Box>
  );
}
