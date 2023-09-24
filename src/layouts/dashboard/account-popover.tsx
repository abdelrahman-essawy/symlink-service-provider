import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, Grid, MenuItem, MenuList, Popover, Switch, Typography } from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import React from 'react';
import RoleBasedRender from '@/hocs/RoleBasedRender';

export const AccountPopover = (props: { anchorEl: any; onClose: any; open: any; }) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      // auth?.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          pt: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {auth?.user?.name}
        </Typography>
      </Box>
      <MenuList
        onClick={onClose}
      >
        <MenuItem
          onClick={() => router.push("/profile")}>
          Profile
        </MenuItem>
        <RoleBasedRender
          componentId="menu-item-service-provider-receive-orders">
          <MenuItem
            disableRipple
            sx={{
              gap: 3,
              cursor: 'auto',
              "&:hover": {
                backgroundColor: 'transparent',
              },
              "&:active": {
                effect: 'none',
              },
            }}

          >
            Receive Orders
            <Switch
              checked={auth?.user?.receiveOrders ?? false}
              color="primary"
              edge="start"
              name="checkedB"
              onChange={() => { }}
            />
          </MenuItem>
        </RoleBasedRender>
      </MenuList>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem
          sx={{
            color: 'red',
          }}
          onClick={handleSignOut}>
          Logout
        </MenuItem>
      </MenuList>
    </Popover >
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};