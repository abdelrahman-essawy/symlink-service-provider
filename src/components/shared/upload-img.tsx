import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/use-auth";
import { Grid, Button, Avatar, Badge, Box } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EditIcon from '@mui/icons-material/Edit';
import Logo from "@/assets/svgs/logo.svg";

function ProfileImgUpload() {
  const { t } = useTranslation();
  const context = useAuth();
  const [loader, setloader] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // handle file selection
  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // handle form submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // perform actions with the selected file
  };

  // handleUploadImage old upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setloader(true);
      // await context?.uploadImg(file);
      event.target.value = ""; //reset
      setloader(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        badgeContent={
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg">
            <Button variant="contained" size="large" component="label" sx={{ bgcolor: "primary.main" }}>
            {  !previewUrl ?
             <PhotoCameraIcon fontSize="small" />
             :
             <EditIcon fontSize="small" />
              }
              <input type="file" onChange={handleFileSelect} hidden />
            </Button>
          </Avatar>
        }
      >
        <Avatar sx={{ width: 80, height: 80 }} alt="User Avatar" src={previewUrl}></Avatar>
      </Badge>
    </form>
  );
}

export default ProfileImgUpload;
