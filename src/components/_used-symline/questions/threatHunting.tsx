import {
  Radio,
  FormLabel,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  RadioGroup,
  FormControl,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { RequestForProposal } from "@/@types/project";
import { RequiredAstrisc } from "@/components/RequiredAstrisc";

interface IProps {
  onChange: (event: any, index: number) => void;
  onChangeNumber: (event: any, index: number) => void;
  projects: RequestForProposal[];
  index: number;
}
export default function ThreatHunting({ onChange, projects, index,onChangeNumber }: IProps) {
  const { t, i18n } = useTranslation();

  return (
    <>
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
            {t("How many servers, network devices, and workstations do you want to review?")} {" "} <RequiredAstrisc/>
          </Typography>
          <Grid spacing={3} container alignItems="center" justifyContent="flex-start">
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel sx={{ mx: 2 }}>{t("Servers")}</FormLabel>
              <TextField
                fullWidth={true}
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" }, mt: 1 }}
                placeholder={`${t("Type here ..")}`}
                variant="outlined"
                name="how_many_server_to_review"
                value={projects[index]?.how_many_server_to_review}
                onChange={(e: any) => onChangeNumber(e, index)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel sx={{ mx: 2 }}>{t("Network devices")}</FormLabel>
              <TextField
                fullWidth={true}
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" }, mt: 1 }}
                placeholder={`${t("Type here ..")}`}
                variant="outlined"
                name="how_many_network_devices_to_review"
                value={projects[index]?.how_many_network_devices_to_review}
                onChange={(e: any) => onChangeNumber(e, index)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel sx={{ mx: 2 }}>
                {t("Workstations")}
              </FormLabel>
              <TextField
                fullWidth={true}
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" }, mt: 1 }}
                placeholder={`${t("Type here ..")}`}
                variant="outlined"
                name="how_many_workstation_to_review"
                value={projects[index]?.how_many_workstation_to_review}
                onChange={(e: any) => onChangeNumber(e, index)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth required>
            <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
              {t("Is the High-Level Diagram (HLD)/Low-Level Diagram (LLD) available and updated?")} {" "} <RequiredAstrisc/>
            </Typography>
            <RadioGroup
              row
              aria-labelledby="is_hld_lld_available"
              name="is_hld_lld_available"
              value={projects[index]?.is_hld_lld_available}
              onChange={(e: any) =>
                onChange(
                  {
                    target: {
                      value: JSON.parse(e?.target?.value),
                      name: e?.target?.name,
                    },
                  },
                  index
                )
              }
            >
              <Grid container>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={true}
                    control={<Radio color="warning" required />}
                    label={t("Yes")}
                    color="warning"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={false}
                    control={<Radio color="warning" required />}
                    label={t("No")}
                    color="warning"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>
            {t("Notes")}
          </Typography>
          <TextField
            fullWidth={true}
            placeholder={`${t("type here your notes")}`}
            variant="outlined"
            name="notes"
            value={projects[index]?.notes}
            onChange={(e: any) => onChange(e, index)}
            multiline
            minRows={3}
            maxRows={5}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", p: 1, pt: 0.5 }, mt: 1 }}
          />
        </Grid>
      </Grid>
    </>
  );
}
