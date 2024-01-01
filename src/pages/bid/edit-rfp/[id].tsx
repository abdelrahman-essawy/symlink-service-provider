import Head from "next/head";
import { Container, Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "../../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import axiosClient from "@/configs/axios-client";
import useAlert from "@/hooks/useAlert";
import { showErrorMessage } from "@/utils/helperFunctions";
import RfpForm from "@/@forms/rfp";
import { useRouter } from "next/router";
import {  RFP } from "@/@types/assessments";
import { useProject } from "@/hooks/use-project";
import ProjectContextProvider from "@/contexts/project-context";
import { ICategory, IProject, RequestForProposal } from "@/@types/project";
import moment from "moment";
const Page = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const title = "Edit RFP";
  const { id } = router.query;
  const projectContext = useProject();
  const [oldInputs, setOldInputs] = useState<ICategory[]>([])
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
  const { showAlert, renderForAlert } = useAlert();

  //TODO: remove this function
  useEffect(() => {
    console.log(formRecord?.projects);
  }, [formRecord]);

  useEffect(() => {
    if (id) {
      //call the function to get the old values of RFP
      (async () => {
        if (id && typeof id === "string") {
          try {
            const res = await projectContext?.getProject(id);
            let oldValues: any = {
              ...res?.data?.data,
              expiration_date: moment(res?.data?.data?.expiration_date)
                .toISOString(true)
                .slice(0, 10),
              projects: res?.data?.data?.request_for_proposal,
            };
            if (oldValues?.request_for_proposal) {
              delete oldValues?.request_for_proposal;
            }
            setOldInputs(
              oldValues?.projects
                ? (oldValues?.projects.map(
                    (project: RequestForProposal) => project?.category
                  ) as ICategory[])
                : ([] as ICategory[])
            );
            setFormRecord(oldValues as RFP);
          } catch (error) {
            router.push("/projects");
          }
        }
      })();
    }
  }, [id, router?.query]);
  //Todo change this function to Edit function
  const handelsubmit = async () => {
    try {
      const res = await axiosClient.put(`multi-rfp/${id}`, formRecord);
      if (res.status === 200 || res.status === 201) {
        showAlert("Success! Your Project Has Been Edited", "success");
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
          editMood={true}
          categoriesIds={oldInputs}
        />
        {renderForAlert()}
      </Container>
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    <ProjectContextProvider>{page}</ProjectContextProvider>
  </DashboardLayout>
);

export default Page;
