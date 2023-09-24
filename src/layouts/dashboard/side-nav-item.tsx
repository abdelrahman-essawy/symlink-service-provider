import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import RoleBasedRender from '@/hocs/RoleBasedRender';
import { StyledBadge } from '@/components/_used-symline/tabs/headerTabs';

export const SideNavItem = (props: { active?: boolean; disabled: boolean; external: any; icon: any; path: any; title: any; items: any[]; amount: number | undefined }) => {
  const { active = false, disabled, external, icon, path, title, items, amount } = props;
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const handleClick = () => {
    setOpen(!open);
  };

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank',
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

  return (
    <li>
      <ButtonBase
        onClick={handleClick}
        sx={{
          alignItems: "center",
          borderRadius: 4,
          display: "flex",
          justifyContent: "flex-start",
          pl: "16px",
          pr: "16px",
          py: 2,
          textAlign: "left",
          width: "100%",
          ...(active && {
            backgroundColor: "primary.main",
          }),
          // "&:hover": {
          //   backgroundColor: "rgba(255, 255, 255, 0.04)",
          // },
        }}
        {...linkProps}
      >

        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              color: "black",
              display: "inline-flex",
              justifyContent: "center",
              mr: 2,
              ...(active && {
                color: "white",

              }),
            }}
          >
            {icon}
          </Box>
        )}
        {/* parent item */}
        <Box
          component="span"
          sx={{
            color: "black",
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            ...(active && {
              color: "white",
              backgroundColor: "primary.main",
            }),
            ...(disabled && {
              color: "grey.500",
            }),
          }}
        >
          {t(title)}
        </Box>
        {amount != undefined && amount !== 0 && (
          <StyledBadge
            badgeContent={amount}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#dbbb76",
                color: "dark-gray",
                width: 26,
                height: 26,
                borderRadius: "50%",
                mx: 1,
              },
            }}
          />
        )

        }
      </ButtonBase>
      {items != undefined && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {items.map((child, key) => {
            const active = child.path ? pathname === child.path : false;
            const secondary_linkProps = child.path
              ? external
                ? {
                  component: "a",
                  href: child.path,
                  target: "_blank",
                }
                : {
                  component: NextLink,
                  href: child.path,
                }
              : {};
            return (
              // child item
              <RoleBasedRender key={key} componentId={child.id}>
                <ButtonBase
                  key={key}
                  sx={{
                    alignItems: "center",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    pl: 4,
                    pr: "16px",
                    py: "6px",
                    mt: .5,
                    textAlign: "left",
                    width: "100%",
                    ...(child.active && {
                      backgroundColor: "primary.main",
                    }),
                    "&:hover": {



                    },
                    ...(active && {
                      backgroundColor: "primary.main",
                    }),
                  }}
                  href="/clients"
                  {...secondary_linkProps}
                >
                  {icon && (
                    <Box
                      component="span"
                      sx={{
                        alignItems: "center",
                        color: "black",
                        display: "inline-flex",
                        justifyContent: "center",
                        mr: 2,
                        ...(active && {
                          color: "white",

                        }),
                      }}
                    >
                      {child.icon}
                    </Box>
                  )}
                  <Box
                    component="span"
                    sx={{
                      color: "black",
                      flexGrow: 1,
                      fontFamily: (theme) => theme.typography.fontFamily,
                      fontSize: 14,
                      fontWeight: 600,
                      lineHeight: "24px",
                      whiteSpace: "nowrap",
                      ...(active && {
                        color: "white",
                      }),
                      ...(disabled && {
                        color: "grey.500",
                      }),
                    }}
                  >
                    {t(child.title)}
                  </Box>
                </ButtonBase>
              </RoleBasedRender>
            );
          })}
        </Collapse>
      )}
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};