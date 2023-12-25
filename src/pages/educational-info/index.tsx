import Head from "next/head";
import { Box, Container, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { Card, TextField } from "@mui/material";
import EducationDialog from "@/components/_used-symline/dialogs/education-dialog";
import { useAuth } from "@/hooks/use-auth";
import useAlert from "@/hooks/use-alert";
import axiosClient from "@/configs/axios-client";
import { showErrorMessage } from "@/utils/helperFunctions";

const Page = () => {
  const title = "Educational info";
  const { t } = useTranslation();
  const auth = useAuth();
  const { showAlert, renderForAlert } = useAlert();
  const [educational_info, setEducational_info] = useState<string>();

  const getProviderInfo = async () => {
    const res = await auth?.getProviderInfo();
    if (res?.status == 200 || res?.status == 201) {
      setEducational_info(res?.data?.data?.providerInfo?.info);
    } else {
      showAlert(res, "error");
    }
  };

  useEffect(() => {
    getProviderInfo();
  }, []);

  useEffect(() => {
    setEducational_info(auth?.providerInfo?.info);
  }, [auth?.providerInfo?.info]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const trimed_educational_info =
      typeof educational_info == "string" ? educational_info.trim() : undefined;
    try {
      await axiosClient.put(`/provider/update-eductional-info`, {
        educational_info: trimed_educational_info,
      });
      showAlert("Your educational info has been updated successfully", "success");
    } catch (error) {
      showAlert(showErrorMessage(error), "error");
    }
  };

  return (
    <>
      <Head>
        <title>{title} | Symlink</title>
      </Head>
      <Container maxWidth="xl">
        <Typography variant="h4">{t(title)}</Typography>

        <Card sx={{ mt: 3, p: 3 }}>
          <Box sx={{ width: "100%", typography: "body1", mb: 1 }}>
            <Typography variant="body1">
              {t(
                "(this option will be hidden from the bidders by default unless you want to be shown in the review page before publishing your proposal)"
              )}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box>
              <TextField
                sx={{
                  direction: "rtl",
                  "&  .MuiInputBase-root": {
                    borderRadius: "12px !important",
                    padding: "0px !important",
                  },
                }}
                fullWidth
                id="Educational info"
                placeholder={`${t("Type here your educational info")}`}
                value={educational_info}
                onChange={(e) => {
                  setEducational_info(e.target.value);
                }}
                multiline
                rows={7}
              />
            </Box>
            <Button
              size="large"
              color="warning"
              sx={{ mt: 3, borderRadius: "34px", px: 5 }}
              type="submit"
              variant="contained"
            >
              {t("Update")}
            </Button>
          </form>
        </Card>
        {renderForAlert()}
      </Container>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
