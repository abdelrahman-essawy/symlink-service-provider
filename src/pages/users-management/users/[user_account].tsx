import { useEffect, useState } from "react";
import Head from "next/head";
import { Avatar, Box, SvgIcon, Typography } from "@mui/material";
import { DashboardLayout } from "../../../layouts/dashboard/layout";
import { useClient } from "@/hooks/use-clients";
import { useRouter } from "next/router";
import { Container, Stack } from "@mui/system";
import SecurityIcon from "@mui/icons-material/Security";
import { UserDetails } from "@/sections/users/user-details";
import {useTranslation} from 'react-i18next';

const Page = () => {
  const {t} = useTranslation();
  const clientContext = useClient();
  const { i18n } = useTranslation();

  const router = useRouter();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (typeof router.query.user_account === "string") {
      await clientContext?.getClient(router.query.user_account);
    }
  };

  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    setUser(clientContext?.selectedClient);
    setLoading(false);
  }, [clientContext?.selectedClient]);

  return (
    <>
      <Head>
        <title>User | Pronto</title>
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
        <></>
        {!loading && user && (
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <Stack
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                spacing={3}
                sx={{ m: 3 }}
              >
                <Typography variant="h4">
                  {user.name}
                  <Typography variant="body2">
                    <SvgIcon fontSize="small" color="primary">
                      <SecurityIcon />
                    </SvgIcon>
                    {t(user.roles)}
                  </Typography>
                </Typography>
                <Avatar sx={{ width: 150, height: 150 }}>
                  <img
                    src={user.avatar}
                    srcSet={user.avatar}
                    alt={user.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Avatar>
              </Stack>
            

              <UserDetails user={user} />
            </Stack>
          </Container>
        )}
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
