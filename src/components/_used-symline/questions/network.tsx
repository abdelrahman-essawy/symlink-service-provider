import {
  Radio,
  FormLabel,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { IMetaData, IProject } from "@/@types/assessments";
import axiosClient from "@/configs/axios-client";
interface IProps {
  onChange: (event: any, index: number) => void;
  onChangeNumber: (event: any, index: number) => void;
  projects: IProject[];
  index: number;
}

export default function Network({ onChange, onChangeNumber, projects, index }: IProps) {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const router = useRouter();
  const [evaluationIsInternal, setEvaluationIsInternal] = useState<IMetaData[]>([]);
  const [assessments, setAssessments] = useState<IMetaData[]>([]);
  const fetchGernalAssessments = async () => {
    try {
      const res = await axiosClient?.get(`meta-data?status=Type_of_assessment`);
      setAssessments(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchEvaluationIsInternal = async () => {
    try {
      const res = await axiosClient?.get(`meta-data?status=evaluation_is_internal_or_external`);
      setEvaluationIsInternal(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEvaluationIsInternal();
    fetchGernalAssessments();
  }, []);
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
          <FormControl fullWidth>
            <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3 }}>
              {t("Assessment Type?")}
            </Typography>
            <RadioGroup
              row
              aria-labelledby="assessments_type_id"
              name="assessments_type_id"
              value={projects[index]?.assessments_type_id}
              onChange={(e: any) => onChange(e, index)}
            >
              <Grid container>
                {assessments?.length &&
                  assessments?.map((question: any) => {
                    return (
                      <Grid item xs={6} md={4} lg={3} key={question?.id}>
                        <FormControlLabel
                          sx={{ width: "100%" }}
                          value={question?.id}
                          control={<Radio color="warning" />}
                          label={t(question?.name)}
                          color="warning"
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3 }}>
            {t("How many IPs to be tested ?")}
          </Typography>
          <Grid spacing={3} container alignItems="center" justifyContent="flex-start">
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel sx={{ mx: 2 }}>{t("Servers")}</FormLabel>
              <TextField
                fullWidth={true}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" }, mt: 1 }}
                placeholder={`${t("Type here ..")}`}
                variant="outlined"
                name="how_many_IPS_should_be_tested_in_servers"
                value={projects[index]?.how_many_IPS_should_be_tested_in_servers}
                onChange={(e: any) => onChangeNumber(e, index)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel sx={{ mx: 2 }}>{t("Workstations")}</FormLabel>
              <TextField
                fullWidth={true}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" }, mt: 1 }}
                placeholder={`${t("Type here ..")}`}
                variant="outlined"
                name="how_many_IPS_should_be_tested_in_workstations"
                value={projects[index]?.how_many_IPS_should_be_tested_in_workstations}
                onChange={(e: any) => onChangeNumber(e, index)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel sx={{ mx: 2 }}>
                {t("Network devices i.e. (firewalls, VPN gatways etc)")}
              </FormLabel>
              <TextField
                fullWidth={true}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" }, mt: 1 }}
                placeholder={`${t("Type here ..")}`}
                variant="outlined"
                name="how_many_IPS_should_be_tested_in_network_devices"
                value={projects[index]?.how_many_IPS_should_be_tested_in_network_devices}
                onChange={(e: any) => onChangeNumber(e, index)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3 }}>
            {t("Is the assessment internal/external ?")}
          </Typography>
            <RadioGroup
              row
              aria-labelledby="evaluation_is_internal_or_external_id"
              name="evaluation_is_internal_or_external_id"
              value={projects[index]?.evaluation_is_internal_or_external_id}
              onChange={(e: any) => onChange(e, index)}
            >
              <Grid container>
                {evaluationIsInternal?.length &&
                  evaluationIsInternal?.map((question: any) => {
                    return (
                      <Grid item xs={12} md={4} key={question?.id}>
                        <FormControlLabel
                          sx={{ width: "100%" }}
                          value={question?.id}
                          control={<Radio color="warning" />}
                          label={question?.name}
                          color="warning"
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3 }}>
            {t("For internal testing, will you provide VPN access to the assessor ?")}
          </Typography>
          <FormControl fullWidth>
            <RadioGroup
              row
              aria-labelledby="vpn_access_to_the_resident"
              name="vpn_access_to_the_resident"
              value={projects[index]?.vpn_access_to_the_resident}
              onChange={(e: any) => onChange(e, index)}
            >
              <Grid container>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={true}
                    control={<Radio color="warning" />}
                    label={t("Yes")}
                    color="warning"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={false}
                    control={<Radio color="warning" />}
                    label={t("No")}
                    color="warning"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" sx={{ mt: 3 }}>
            {t("Approach of the assessment (white/grey/black)")}
          </Typography>
          <Grid spacing={3} container alignItems="center" justifyContent="flex-start">
            <Grid item xs={12}>
              <FormLabel sx={{ mx: 0.5 }}>
                {t("(If you want to be more specific, please comment in the textbox below)")}
              </FormLabel>
              <TextField
                fullWidth={true}
                multiline
                name="evaluation_approach"
                value={projects[index]?.evaluation_approach}
                onChange={(e: any) => onChange(e, index)}
                rows={3}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" }, mt: 1 }}
                placeholder={`${t("Description")}`}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
            {t("List the scoped IPs: (i.e. 1.1.1.1)")}
          </Typography>
          <Grid container alignItems="center" justifyContent="flex-start">
            <Grid item xs={12}>
              <FormLabel sx={{ mx: .5 }}>
                {t(
                  "(this information will be hidden from the bidders by default unless you want to be shown in the review page before publishing your proposal)"
                )}
              </FormLabel>
              <TextField
                fullWidth={true}
                multiline
                rows={3}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" }, mt: 1 }}
                placeholder={`${t("Description")}`}
                variant="outlined"
                name="details_ips_scoped"
                value={projects[index]?.details_ips_scoped}
                onChange={(e: any) => onChange(e, index)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
              {t("Is active directory part of the assessment ?")}
            </Typography>
            <RadioGroup
              row
              aria-labelledby="active_directory"
              name="active_directory"
              value={projects[index]?.active_directory}
              onChange={(e: any) => onChange({target:{
                value: JSON.parse(e?.target?.value),
                name: e?.target?.name,
              }}, index)}
            >
              <Grid container>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={true}
                    control={<Radio color="warning" />}
                    label={t("Yes")}
                    color="warning"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={false}
                    control={<Radio color="warning" />}
                    label={t("No")}
                    color="warning"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
              {t("Is it mandatory that the assessor to be onsite ?")}
            </Typography>
            <RadioGroup
              row
              aria-labelledby="necessary_resident_be_on_site"
              name="necessary_resident_be_on_site"
              value={projects[index]?.necessary_resident_be_on_site}
              onChange={(e: any) => onChange({target:{
                value: JSON.parse(e?.target?.value),
                name: e?.target?.name,
              }}, index)}
            >
              <Grid container>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={true}
                    control={<Radio color="warning" />}
                    label={t("Yes")}
                    color="warning"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={false}
                    control={<Radio color="warning" />}
                    label={t("No")}
                    color="warning"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 1 }}>
            {t("If yes, how many times ?")}
          </Typography>

          <Grid container alignItems="center" justifyContent="flex-start">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth={true}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" } }}
                placeholder={`${t("Type here ..")}`}
                variant="outlined"
                name="how_many_times_on_site"
                value={projects[index]?.how_many_times_on_site}
                onChange={(e: any) => onChangeNumber(e, index)}
                type="text"
                inputProps={{
                  pattern: "^\\d+(\\.\\d+)?$", // Enforce numbers only pattern
                  inputMode: "numeric", // Show numeric keyboard on mobile devices
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
                {t(
                  "Is verification required to assess whether the reported vulnerabilities have been fixed?"
                )}
              </Typography>
              <RadioGroup
                row
                aria-labelledby="Verify_that_vulnerabilities_are_fixed"
                name="Verify_that_vulnerabilities_are_fixed"
                value={projects[index]?.Verify_that_vulnerabilities_are_fixed}
                onChange={(e: any) => onChange({target:{
                  value: JSON.parse(e?.target?.value),
                  name: e?.target?.name,
                }}, index)}
              >
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      sx={{ width: "100%" }}
                      value={true}
                      control={<Radio color="warning" />}
                      label={t("Yes")}
                      color="warning"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      sx={{ width: "100%" }}
                      value={false}
                      control={<Radio color="warning" />}
                      label={t("No")}
                      color="warning"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
