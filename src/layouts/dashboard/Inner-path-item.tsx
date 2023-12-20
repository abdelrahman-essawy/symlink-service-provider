import NextLink from "next/link";
import PropTypes from "prop-types";
import { Box, ButtonBase, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import RoleBasedRender from "@/hocs/RoleBasedRender";
import { StyledBadge } from "@/components/_used-symline/tabs/headerTabs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from "next/router";
export const SideNavInnerItem = (props: { previousPath: string }) => {
  const { previousPath } = props;
  const { t ,i18n} = useTranslation();
  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  //remove "/" and make first char upperCase for tanslation 
  const getPathTitle = ()=>{
   if(previousPath?.search("settings")!=-1){
      return capitalizeFirstLetter(previousPath?.split('/').pop() || '').split('-').join(' ');
    }
    if(previousPath?.search("project_id")!=-1){
      return capitalizeFirstLetter(previousPath?.split('/[project_id]').pop() || 'projects').split('-').join(' ');
    }
    return (previousPath?.slice(1) as string).replace(/(^|\s)\S/g, (match) =>
    match.toUpperCase()
  );
  } 
  const title = getPathTitle();
  const router = useRouter();
  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: "center",
          borderRadius: 4,
          display: "flex",
          justifyContent: "space-between",
          pl: "16px",
          pr: "16px",
          py: 2,
          textAlign: i18n.language === "en" ? 'right' : 'left',
          width: "100%",
          gap: "15px",
        }}
        onClick={() => {
          if(previousPath?.search("project_id")!=-1) {
            router.back();
          }
          else {
            router.push(previousPath);
          }
        }}
      >
        <Box>
          <IconButton
            sx={{
              borderRadius: "50%",
              bgcolor: "#faacd",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              color: "#949494",
              boxShadow: ".5px 0px 3px .5px #ababab",
            }}
            size="small"
          >
            {  i18n.language === "ar" ?
              <ArrowForwardIcon />
              :
              <ArrowBackIcon />
              }
          </IconButton>
        </Box>
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
          }}
        >
          {`${t("Back to")} ${t(title)}`}
        </Box>
      </ButtonBase>
    </li>
  );
};

SideNavInnerItem.propTypes = {
  previousPath: PropTypes.string,
};
