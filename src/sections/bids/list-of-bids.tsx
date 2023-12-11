import Head from "next/head";
import { Button, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import router from "next/router";
import RoleBasedRender from "@/hocs/RoleBasedRender";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { usePageUtilities } from "@/hooks/use-page-utilities";
import { DashboardLayout } from "@/layouts/dashboard/layout";
import { DataTable } from "@/components/shared/DataTable";
import { useBid } from "@/hooks/use-bid";
import BidContextProvider from "@/contexts/bid-context";
import { IBid } from "@/@types/bid";
import { useRouter } from "next/navigation";
import { getLocalTime } from "@/utils/helperFunctions";
import { SearchBar } from "@/sections/shared/search-bar";
import Noitems from "@/components/shared/no-items";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

function ListOfBids({}) {
  return (
    <>
    

    </>
  )
}

export default ListOfBids