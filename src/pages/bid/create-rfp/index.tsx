import Head from "next/head";
import {
  Container,
  Badge,
  Grid,
  Typography,
  Popover,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "../../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import GeneralQuestions from "@/sections/bids/create-bids/general-questions";
import InputAdornment from "@mui/material/InputAdornment";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import axiosClient from "@/configs/axios-client";
import RenderAssessments from "@/sections/bids/create-bids/render-assessments";
import { IAssessmentProject, IQuestion, RFP } from "@/@types/assessments";
import CircularProgress from "@mui/material/CircularProgress";
import useAlert from "@/hooks/useAlert";
import { ICategory } from "@/@types/project";
import { showErrorMessage } from "@/utils/helperFunctions";
import RfpForm from "@/@forms/rfp";
const Page = () => {
  const { i18n } = useTranslation();
  const title = "Create RFP";
  const [formRecord, setFormRecord] = useState<RFP>({
    project_name: "",
    time_type_id: "",
    expiration_date: "",
    firstFullName: "",
    firstEmail: "",
    firstMobile: "",
    secondFullName: "",
    secondEmail: "",
    secondMobile: "",
    projects: [],
  });
  const { t } = useTranslation();
  const router = useRouter();
  const { showAlert, renderForAlert } = useAlert();

  //TODO: remove this function
  // useEffect(() => {
  //   console.log(formRecord);
  // }, [formRecord]);

  const handelsubmit = async () => {
    try {
      const res = await axiosClient.post("multi-rfp", formRecord);
      if (res.status === 200 || res.status === 201) {
        router.push("/projects");
      }
    } catch (err: any) {
      showAlert(showErrorMessage(err), "error");
    }
  };

  return (
    <>
      <Head>
        <title>{title} | Symline</title>
      </Head>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 2 }} fontWeight={"bold"}>
          {dictionary(title as TranslatedWord)}
        </Typography>
        <RfpForm
          handelsubmit={handelsubmit}
          formRecord={formRecord}
          setFormRecord={setFormRecord}
        />
        {renderForAlert()}
      </Container>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
