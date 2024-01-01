import {
  Grid,
  Typography,
  Box,
  FormLabel,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import {  RequestForProposal } from "@/@types/project";
import MultilineTypography from "@/components/multilineTypography";
interface IProps {
  project: RequestForProposal;
}

export default function ArchitectureConfigurationReviewAnswer({  project }: IProps) {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  
  return (
    <Box>
    <Typography
      variant="h6"
      fontWeight="bold"
      color="primary"
      sx={{ p: 1, mb: 2, borderRadius: 1, bgcolor: "primary.lightest" }}
    >
      {project?.category?.name}
    </Typography>
    <Grid
      container
      spacing={0}
      alignItems="center"
      flexDirection={"row"}
      justifyContent={"end"}
      textAlign={i18n.language == "en" ? "right" : "left"}
    >
      <Grid item xs={12}>
        <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3 }}>
          {t("How many servers, network devices, and workstations do you want to review?")}{" "}
        </Typography>
        <Grid spacing={3} container alignItems="center" justifyContent="flex-start">
          <Grid item xs={12} sm={6} md={4}>
            <FormLabel sx={{ mx: 2 }}>{t("Servers")}</FormLabel>
            <MultilineTypography value={project?.how_many_server_to_review} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormLabel sx={{ mx: 2 }}>{t("Network devices")}</FormLabel>
            <MultilineTypography value={project?.how_many_network_devices_to_review} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormLabel sx={{ mx: 2 }}>{t("Workstations")}</FormLabel>
            <MultilineTypography value={project?.how_many_workstation_to_review} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <MultilineTypography value={project?.is_hld_lld_available ? t("Yes") : t("No")} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>
          {t("Notes")}
        </Typography>
        <MultilineTypography value={project?.notes} />
      </Grid>
    </Grid>
  </Box>
  );
}
