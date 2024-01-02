import { Grid, Typography, Box, FormLabel, Container } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { RequestForProposal } from "@/@types/project";
import MultilineTypography from "@/components/multilineTypography";
interface IProps {
  project: RequestForProposal;
}

export default function ArchitectureConfigurationReviewAnswer({ project }: IProps) {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        color="primary"
        sx={{ p: 1, my: 1, borderRadius: 1, bgcolor: "primary.lightest" }}
      >
        {project?.category?.name}
      </Typography>
      <Container maxWidth={"xl"}>
        <Grid
          container
          spacing={0}
          alignItems="center"
          flexDirection={"row"}
          justifyContent={"end"}
          textAlign={i18n.language == "en" ? "right" : "left"}
        >
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, mt: 1 }}>
              {t("How many servers, network devices, and workstations do you want to review?")}{" "}
            </Typography>
            <Grid spacing={0} container justifyContent="end">
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}
              >
                <Typography variant="body1" fontWeight={"bold"} sx={{ mx: 2 }}>{t("Servers")}</Typography>
                <Typography variant="body2" color="initial">
                  {project?.how_many_server_to_review}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}
              >
                <Typography variant="body1" fontWeight={"bold"} sx={{ mx: 2 }}>{t("Network devices")}</Typography>
                <Typography variant="body2" color="initial">
                  {project?.how_many_network_devices_to_review}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}
              >
                <Typography variant="body1" fontWeight={"bold"} sx={{ mx: 2 }}>{t("Workstations")}</Typography>
                <Typography variant="body1" color="initial">
                  {project?.how_many_workstation_to_review}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
              {t("Is the High-Level Diagram (HLD)/Low-Level Diagram (LLD) available and updated?")}
            </Typography>
            <MultilineTypography value={project?.is_hld_lld_available ? t("Yes") : t("No")} />
          </Grid>
        
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>
              {t("Notes")}
            </Typography>
            <MultilineTypography value={project?.notes} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
