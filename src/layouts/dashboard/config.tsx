import CogIcon from "@heroicons/react/24/solid/CogIcon";
import WalletIcon from "@mui/icons-material/Wallet";
import { SvgIcon } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VideocamIcon from "@mui/icons-material/Videocam";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import React from "react";
import { truncate } from "fs";

export const items = [
  {
    // used in symline
    external: false,
    disabled: false,
    menu: false,
    title: "Projects",
    path: "/projects",
    icon: (
      <SvgIcon fontSize="small">
        <DashboardIcon />
      </SvgIcon>
    ),
  },

  {
    // used in symline
    external: false,
    disabled: false,
    menu: false,
    id: "sidenav-bids",
    title: "Bids",
    path: "/bids",
    icon: (
      <SvgIcon fontSize="small">
        <AccountCircleIcon />
      </SvgIcon>
    ),
  },
  {
    // used in symline
    external: false,
    disabled: false,
    menu: false,
    title: "Wallet",
    path: "/wallet",
    icon: (
      <SvgIcon fontSize="small">
        <WalletIcon />
      </SvgIcon>
    ),
  },
  {
    // used in symline
    external: false,
    disabled: false,
    menu: false,
    id: "sidenav-educational-info",
    title: "Educational info",
    path: "/educational-info",
    icon: (
      <SvgIcon fontSize="small">
        <FindInPageIcon />
      </SvgIcon>
    ),
  },
  {
    // used in symline
    external: false,
    disabled: false,
    menu: false,
    id: "sidenav-experience",
    title: "Experience",
    path: "/experience",
    icon: (
      <SvgIcon fontSize="small">
        <SchoolIcon />
      </SvgIcon>
    ),
  },
  {
    // used in symline
    external: false,
    disabled: false,
    menu: false,
    id: "sidenav-certificate",
    title: "Certificate",
    path: "/certificate",
    icon: (
      <SvgIcon fontSize="small">
        <WorkspacePremiumIcon />
      </SvgIcon>
    ),
  },
  {
    // used in symline
    external: false,
    disabled: false,
    menu: false,
    title: "Support",
    path: "/support",
    icon: (
      <SvgIcon fontSize="small">
        <VideocamIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    id: "sidenav-settings",
    title: "Settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
    children: [
      {
        // used in symline
        external: false,
        disabled: false,
        menu: false,
        id: "sidenav-profile",
        title: "Profile",
        path: "/profile",
        icon: (
          <SvgIcon fontSize="small">
            <AccountCircleIcon />
          </SvgIcon>
        ),
      },
      {
        external: false,
        disabled: false,
        menu: false,
        title: "About",
        path: "/settings/about",
        icon: (
          <SvgIcon fontSize="small">
            <AccountCircleIcon />
          </SvgIcon>
        ),
      },

      {
        external: false,
        disabled: false,
        menu: false,
        title: "Terms and Conditions",
        path: "/settings/terms-and-conditions",
        icon: (
          <SvgIcon fontSize="small">
            <AccountCircleIcon />
          </SvgIcon>
        ),
      },
      {
        external: false,
        disabled: false,
        menu: false,
        title: "Contact us",
        path: "/settings/contact-us",
        icon: (
          <SvgIcon fontSize="small">
            <AccountCircleIcon />
          </SvgIcon>
        ),
      },
      {
        external: false,
        disabled: false,
        menu: false,
        title: "Create company",
        path: "/settings/create-company",
        icon: (
          <SvgIcon fontSize="small">
            <AccountCircleIcon />
          </SvgIcon>
        ),
      },
      {
        external: false,
        disabled: false,
        menu: false,
        title: "Deactivate account",
        path: "/settings/deactivate-account",
        icon: (
          <SvgIcon fontSize="small">
            <AccountCircleIcon />
          </SvgIcon>
        ),
      },
    ],
  },
];
