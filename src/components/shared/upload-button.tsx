import Head from "next/head";
import Image from "next/image";
import { Typography, Button, CircularProgress } from "@mui/material";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
    loading: boolean;
    btnTitle:string;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UploadButton({ handleFileUpload,btnTitle="Upload",loading=false }: IProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      <Button
        variant="contained"
        color="warning"
        size="large"
        onClick={() => fileInputRef?.current?.click()}
      >
        <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {loading ? <CircularProgress thickness={1.5} /> : t(btnTitle)}
        </Typography>
      </Button>
    </>
  );
}

export default UploadButton;
