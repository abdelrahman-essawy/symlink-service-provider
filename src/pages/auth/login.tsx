import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Grid,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { useAuth } from '../../hooks/use-auth';
import { AuthLayout } from '../../layouts/auth/layout';
import { useTranslation } from 'react-i18next';

const service_provider = {
  username: 'service_provider',
  password: 'secret',
  role: 'service_provider',
  name: 'Service Provider',
  avatar: '/static/mock-images/avatars/avatar_default.jpg',
  submit: null
}

const client = {
  username: 'client',
  password: 'secret',
  role: 'client',
  name: 'Client',
  avatar: '/static/mock-images/avatars/avatar_default.jpg',
  submit: null
}

const Page = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('username');
  const formik = useFormik({
    // initialValues: {
    //   username: 'superadmin',
    //   password: 'secret',
    //   submit: null
    // },
    initialValues: service_provider,
    validationSchema: Yup.object({
      username: Yup
        .string()
        .max(255)
        .required('username is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth?.signIn(values.username, values.password);
        router.push('/');
      } catch (err: any) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleMethodChange = useCallback(
    (_event: any, value: React.SetStateAction<string>) => {
      setMethod(value);
    },
    []
  );

  const handleSkip = useCallback(
    () => {
      // auth.skip();
      router.push('/');
    },
    [router]
  );

  return (
    <>
      <Head>
        <title>
          {t("Login")} | Symline
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          direction: "ltr",
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>



            {method === 'username' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Grid container spacing={3} justifyContent="center" alignItems="center">

                  <Grid item xs={9} >
                    <Stack
                      spacing={1}
                      sx={{ mb: 3 }}
                    >
                      <Typography variant="h4">
                        {t('Login')}
                      </Typography>
                    </Stack>
                    <TextField
                      error={!!(formik.touched.username && formik.errors.username)}
                      fullWidth
                      helperText={formik.touched.username && formik.errors.username}
                      placeholder={`${t('username')}`}
                      name="username"
                      sx={{ mb: 3 }}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="username"
                      value={formik.values.username}
                    />
                    <TextField
                      error={!!(formik.touched.password && formik.errors.password)}
                      fullWidth
                      helperText={formik.touched.password && formik.errors.password}
                      placeholder={`${t('password')}`}
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.password}
                    />
                    <Typography
                      sx={{
                        mx: 2,
                        mt: 2,

                        fontSize: 14,
                        fontWeight: 700,
                      }}
                      color={"primary"}
                    >
                      <NextLink href="/auth/login" style={{ textDecoration: "none" }}>
                        {t("Forgot password ?")}
                      </NextLink>
                    </Typography>
                    <Button
                      fullWidth
                      size="large"
                      color="warning"
                      sx={{ mt: 3, borderRadius: '50px' }}
                      type="submit"
                      variant="contained"
                    >
                      {t('continue')}
                    </Button>
                  </Grid>
                </Grid>

                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}

              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;