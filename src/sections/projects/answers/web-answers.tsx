import { Grid, Typography, Box, Container } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { RequestForProposal } from "@/@types/project";
import MultilineTypography from "@/components/multilineTypography";
interface IProps {
  project: RequestForProposal;
}

export default function WebAnswers({ project }: IProps) {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        color="primary"
        sx={{ p: 1, my: 2, borderRadius: 1, bgcolor: "primary.lightest" }}
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
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 1 }}>
              {t("Target URL/IP address")}
            </Typography>
            <MultilineTypography value={project?.target_ip_address} />
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
        </Grid>
      </Container>
    </Box>
  );
}
