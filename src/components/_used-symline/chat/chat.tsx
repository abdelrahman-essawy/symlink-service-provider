import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Avatar,
  AppBar,
  Radio,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useRouter } from 'next/navigation';

import { useTranslation } from "react-i18next";
import TagIcon from '@mui/icons-material/Tag';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { styled } from '@mui/material/styles';


export default function Chat() {

  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [sendToGroup, setSendToGroup] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [showThread, setShowThread] = React.useState(true);
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const pages = ['Products', 'Pricing', 'Blog'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  const openThread = () => {
    setShowThread(true);
  };
  const handleThread = (value: boolean) => {
    setShowThread(value);

  };
  const closeThread = () => {
    setShowThread(false);
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleRadio = () => {
    setSendToGroup(!sendToGroup); // Toggle the checked state when the radio button is clicked
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <>
      <Grid container spacing={0} justifyContent="space-between">

        <Grid sx={{
          transition: '120ms cubic-bezier(0.1, 0.7, 0.6, 0.9)', borderRight: '1px solid lightgrey', display: {
            xs: showThread ? 'none' : 'block',
            md: 'block',
          }
        }} item xs={12} md={showThread ? 7 : 12}>
          <Grid item xs={12} >
            <AppBar position="static" >
              <Container maxWidth="xl">
                <Toolbar disableGutters>


                  <Box sx={{ flexGrow: 1, }}>

                    <Tooltip title="Threads">

                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={openThread}
                        color="inherit"
                      >
                        <TagIcon />
                      </IconButton>
                    </Tooltip>

                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}

                    >
                      {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>

                  </Box>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open profile">
                      <IconButton onClick={() => (router.push('/profile'))} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
          </Grid>
          <Box
            sx={{
              height: "500px",
              p: 2,
              position: 'relative',
              overflow: 'auto'
            }}
          >
            <Message
              reply={true}
              messages={false}
              openThread={handleThread}
              name="احمد حسن"
              message="هل لديك أي حماية في التطبيق؟"
              time="8:19 pm"
              avatar={require("../../../assets/icons/done-icon")}
            />

            <Message
              name="user"
              reply={false}
              openThread={handleThread}

              messages={true}
              message="هل لديك أي حماية في التطبيق؟"
              time="8:19 pm"
              avatar={require("../../../assets/icons/done-icon")}
            />
            <Message
              name="احمد حسن"
              message="هل لديك أي حماية في التطبيق؟"
              time="8:19 pm"
              avatar={require("../../../assets/icons/done-icon")}
            />
          </Box>
          <Divider variant="middle" sx={{ my: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              paddingX: 2,
              gap: 1,
            }}
          >
            <input
              type="text"
              style={{ width: "100%", height: "50px", border: "unset", outline: "unset" }}
              placeholder="اكتب رسالة هنا ..."
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
              }}
            >
              <Avatar
                component="label"
                sx={{
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #ECECEC",
                  color: "#373737",
                  transform: "rotate(45deg)",
                }}

              >


                <VisuallyHiddenInput type="file" />
                <AttachFileIcon sx={{ cursor: 'pointer' }} />
              </Avatar>
              <Avatar
                sx={{
                  backgroundColor: "#FFD777",
                  color: "#ffffff",
                  transform: "rotate(-45deg)",
                }}
              >
                <SendIcon sx={{ cursor: 'pointer' }} />
              </Avatar>
            </Box>
          </Box>

        </Grid>

        <Grid item xs={12} md={5} sx={{ display: showThread ? 'block' : 'none', }}>
          <Grid item xs={12} >
            <AppBar position="static" >
              <Container maxWidth="xl">
                <Toolbar disableGutters>



                  <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <TagIcon />
                    <Typography variant="subtitle1" sx={{ mx: 1 }}>
                      Thread name

                    </Typography>


                  </Box>
                  <Box sx={{ flexGrow: 0, transform: 'translate(50%, 0%)' }}>

                    <Tooltip title="Close" >

                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={closeThread}
                        color="inherit"
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    </Tooltip>



                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
          </Grid>
          <Box
            sx={{
              p: 2,
              height: "500px",
              position: 'relative',
              overflow: 'auto'
            }}
          >

            <Message

              name="احمد حسن"
              message="هل لديك أي حماية في التطبيق؟"
              time="8:19 pm"
              avatar={require("../../../assets/icons/done-icon")}
            />

            <Message
              name="user"
              message="هل لديك أي حماية في التطبيق؟"
              time="8:19 pm"
              avatar={require("../../../assets/icons/done-icon")}
            />
            <Message
              name="احمد حسن"
              message="هل لديك أي حماية في التطبيق؟"
              time="8:19 pm"
              avatar={require("../../../assets/icons/done-icon")}
            />
            <Message
              name="احمد حسن"
              message="هل لديك أي حماية في التطبيق؟"
              time="8:19 pm"
              avatar={require("../../../assets/icons/done-icon")}
            />
            <Message
              name="احمد حسن"
              message="هل لديك أي حماية في التطبيق؟"
              time="8:19 pm"
              avatar={require("../../../assets/icons/done-icon")}
            />
            <Message
              name="احمد حسن"
              message="هل لديك أي حماية في التطبيق؟"
              time="8:19 pm"
              avatar={require("../../../assets/icons/done-icon")}
            />
          </Box>
          <Divider variant="middle" sx={{ my: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: 'center',

              paddingX: 2,
              gap: 1,
            }}
          >
            <input
              type="text"
              style={{ width: "100%", height: "50px", border: "unset", outline: "unset" }}
              placeholder="اكتب رسالة هنا ..."
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: 'center',
                gap: 1,
                pb: 1
              }}
            >
             
              <Avatar
                component="label"
                sx={{
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #ECECEC",
                  color: "#373737",
                  transform: "rotate(45deg)",
                }}

              >


                <VisuallyHiddenInput type="file" />
                <AttachFileIcon sx={{ cursor: 'pointer' }} />

              </Avatar>
              <Avatar
                sx={{
                  backgroundColor: "#FFD777",
                  color: "#ffffff",
                  transform: "rotate(-45deg)",
                }}
              >
                <SendIcon sx={{ cursor: 'pointer' }} />
              </Avatar>
            </Box>
          </Box>
        </Grid>
      </Grid>

    </>
  )
}


const Message = ({ name, avatar, message, time, reply, messages, openThread }: any) => {
  const { t } = useTranslation();
  const handleThread = () => {
    openThread(true);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: name === "user" ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: "30px",
        mb: 7,
      }}
    >
      <Avatar alt="Remy Sharp" src={avatar} />
      <Box
        sx={{
          bgcolor: name === "user" ? "#F6F6F6" : "#adb8ef",
          borderRadius: "10px",
          width: name === "user" ? "70%" : "50%",
          p: 2,
          position: "relative",
        }}
      >
        <Typography sx={{ mb: 2 }} variant="h6">
          {name}
        </Typography>
        <Typography variant="body1">{message}</Typography>
        <Typography variant="body2">{time}</Typography>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: name === "user" ? "#F6F6F6" : "#adb8ef",
            transform: name === "user" ? "skewX(-35deg)" : "skewX(35deg)",
            right: name === "user" ? "unset" : "-5px",
            left: name === "user" ? "-5px" : "unset",
            width: "40px",
            height: "20px",
          }}
        ></div>
        <Box sx={{ position: 'relative', }}>

          <Typography onClick={handleThread} sx={{ '&:hover': { opacity: .7 }, cursor: 'pointer', display: messages ? 'block' : 'none', position: 'absolute', mt: 2, py: 2, unicodeBidi: 'embed', direction: 'rtl' }} color="primary" variant="subtitle1" fontWeight="bold">
            4 Messages
          </Typography>
          <Typography onClick={handleThread} sx={{ '&:hover': { opacity: .7 }, cursor: 'pointer', display: reply ? 'block' : 'none', position: 'absolute', mt: 2, py: 2, unicodeBidi: 'embed', direction: 'rtl' }} color="primary" variant="subtitle1" fontWeight="bold">
            reply
          </Typography>
        </Box>
      </Box>

    </Box>
  );
};