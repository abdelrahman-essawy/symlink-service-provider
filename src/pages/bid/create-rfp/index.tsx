import Head from "next/head";
import {
  Container,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DashboardLayout } from "../../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import { useRouter } from "next/navigation";
import axiosClient from "@/configs/axios-client";
import {  RFP } from "@/@types/assessments";
import useAlert from "@/hooks/useAlert";
import { showErrorMessage } from "@/utils/helperFunctions";
import RfpForm from "@/@forms/rfp";
const Page = () => {
  const { i18n } = useTranslation();
  const title = "Create RFP";
  const [formRecord, setFormRecord] = useState<RFP>({
    project_name: "",
    preferred_testing_time: [],
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
