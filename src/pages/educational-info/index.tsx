import Head from "next/head";
import { Box, Container, Button, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import React, {useState} from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { Card } from "@mui/material";
import EducationDialog from "@/components/_used-symline/dialogs/education-dialog";

const Page = () => {
  const title = "Educational info";
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen= () => {
    setOpen(true);
  };

  return (
    <>
      <Head>
        <title>{title} | Symlink</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          bgcolor: "primary.lightest",
          borderTopLeftRadius: i18n.language == 'ar' ? 25 : 0,
          borderBottomLeftRadius: i18n.language == 'ar' ? 25 : 25,
          borderTopRightRadius: i18n.language == 'ar' ? 0 : 25,
          borderBottomRightRadius: i18n.language == 'ar' ? 0 : 25,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">{t(title)}</Typography>

          <Card sx={{ mt: 3, p: 3 }}>
            <Box sx={{ width: "100%", typography: "body1", mb: 1 }}>
              <Typography variant="body1">
                {"("}
                {t("This option will be hidden")}
                {")"}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                p: 2,
                border: "1px solid #C4C4C4",
                borderRadius: 2,
              }}
            >
              <Typography variant="body1">
                {t("Programming Languages for Backend Development")}
              </Typography>
              <Box sx={{ m: 2 }}>
                <Typography variant="body1">{t("Lorem Test")}</Typography>
                <Typography variant="body1">{t("Lorem Test")}</Typography>
              </Box>
              <Box sx={{ m: 2 }}>
                <Typography variant="body1">{t("Lorem Test")}</Typography>
                <Typography variant="body1">{t("Lorem Test")}</Typography>
              </Box>
            </Box>
            <Button
            onClick={handleOpen}
              size="large"
              color="warning"
              sx={{ mt: 3, borderRadius: "50px" }}
              type="submit"
              variant="contained"
            >
              {t("Update")}
            </Button>
          </Card>
        </Container>
      </Box>
      <EducationDialog open={open} handleClose={handleClose}/>

    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
