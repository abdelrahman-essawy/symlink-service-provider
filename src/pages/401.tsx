
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import React from 'react';
import { getPermissionNameFromPath, hasPermissionToViewPath } from '@/configs/pathsPermission';
import { useAuth } from '@/hooks/use-auth';
import { getRolesThatCanAccessPathName } from '@/configs/roles';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  text: {
    marginBottom: theme.spacing(2),
  },
}));

function UnauthorizedPage() {
  const classes = useStyles();
  const auth = useAuth();
  const router = useRouter();
  const destination = router.asPath;



  if (process.env.NODE_ENV === 'development') {
    if (!getPermissionNameFromPath(destination as any)) {
      return <div>No rule is set for this destination, please set one.</div>
    }
    return (
      <>
        <div>Not authorized to view {destination}</div>
        <div>Your role: {auth?.user?.role}</div>
        <div>You need permission: {getPermissionNameFromPath(destination as any)}</div>
        <div>
          Roles that can access {destination}: {getRolesThatCanAccessPathName(destination)}
        </div>
      </>
    );
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.text}>
        401 Unauthorized
      </Typography>
      <Typography variant="body1" className={classes.text}>
        You are not authorized to access this page.
      </Typography>
    </div>
  );
}

export default UnauthorizedPage;