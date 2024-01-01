import { Radio,  Grid, Typography, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import {  RequestForProposal } from "@/@types/project";
import { RequiredAstrisc } from "@/components/RequiredAstrisc";
interface IProps {
  onChange: (event: any, index: number) => void;
  onChangeNumber: (event: any, index: number) => void;
  projects: RequestForProposal[];
  index: number;
}

export default function Web({ onChange, onChangeNumber, projects, index }: IProps) {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
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
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>
            {t("Target URL/IP address")} {" "} <RequiredAstrisc/>
          </Typography>
          <TextField
            required
            fullWidth={true}
            placeholder={`${t("hr.example.com")}`}
            variant="outlined"
            name="target_ip_address"
            value={projects[index]?.target_ip_address}
            onChange={(e: any) => onChange(e, index)}
            multiline
            rows={3}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", p: 1, pt: 0.5 }, mt: 1 }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth required>
            <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
              {t("The approach of the assessment:")} {" "} <RequiredAstrisc/>
            </Typography>
            <RadioGroup
              row
              aria-labelledby="approach_of_assessment"
              name="approach_of_assessment"
              value={projects[index]?.approach_of_assessment}
              onChange={(e: any) =>onChange(e, index)}
              aria-required
            >
              <Grid container>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={"WHITE"}
                    control={<Radio color="warning"  required/>}
                    label={t("Whitebox Approach (i.e., Credentials, Whitelisting, etc.)")}
                    color="warning"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={"BLACK"}
                    control={<Radio color="warning" required />}
                    label={t("Blackbox Approach")}
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
