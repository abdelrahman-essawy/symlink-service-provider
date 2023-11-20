import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
  Box,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  ButtonBase,
  useMediaQuery
} from '@mui/material';
import React ,{useEffect, useState} from 'react';
import { Scrollbar } from '../../components/scrollbar';
import { items,profileItems } from './config';
import { SideNavItem } from './side-nav-item';
import { Theme } from '@mui/material';
import RoleBasedRender from '@/hocs/RoleBasedRender';
import usePreviousPath from '@/hooks/usePreviousPath';
import { useTranslation } from 'react-i18next';
import { SideNavInnerItem } from './Inner-path-item';
import { useTheme } from '@mui/material';
import { createTheme } from "@/theme";
export const SideNav = (props: { open: any; onClose: any; }) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const theme = useTheme();
  const { i18n } = useTranslation();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const {previousPath,isinnerPath,isProfilePath} = usePreviousPath();
  const {t} = useTranslation();
  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'grey.500'
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 100,
              width: '100%',
              justifyContent: "center",

            }}
          >
            <img src={"/assets/Logo_2.svg"} className="App-logo" alt="logo" style={{maxWidth:"90%"}}  />
          </Box>
        </Box>
        {/* <Divider sx={{ borderColor: 'grey.700' }} /> */}
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
       <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
              display: isinnerPath ?'flex' : "none",
            }}
          >
            <SideNavInnerItem previousPath={previousPath}  />
          </Stack>

          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
              // display: isinnerPath ? "none":'flex',
              height: isinnerPath ? "0":'auto',
              transition: 'height 0.3s ease',
              overflow: 'hidden'
            }}
          >
            {items.map((item: any, key) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <RoleBasedRender key={key} componentId={item?.id ?? ``}>
                  <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                    items={item.children}
                    amount={item.amount}
                  />
                </RoleBasedRender>
              );
            })}
          </Stack>
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
              // display: isinnerPath ? "none":'flex',
              height: isProfilePath ? "auto":'0',
              transition: 'height 0.3s ease',
              overflow: 'hidden'
            }}
          >
            {profileItems.map((item: any, key) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <RoleBasedRender key={key} componentId={item?.id ?? ``}>
                  <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                    items={item.children}
                    amount={item.amount}
                  />
                </RoleBasedRender>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );
  useEffect(() => {
    console.log(theme.direction)
  },[theme.direction]);       
  if (lgUp) {
    return (
      <Drawer
        anchor={i18n.language === "en" ? 'right' : 'left'}
        open
        PaperProps={{
          sx: {
            backgroundColor: 'white',
            color: 'black',
            width: 280,
            border: 'none',
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
    anchor={i18n.language === "en" ? 'right' : 'left'}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'white',
          color: 'black',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};