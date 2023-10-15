import Head from "next/head";
import {
  Box,
  Card,
  Container,
  Grid,
  CardContent,
  Typography,
  Button,
  Divider,
  Avatar,
  SvgIcon,
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

import { DashboardLayout } from "../../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import CustomTabPanel from "@/components/_used-symline/tabs/tabsPanel";
import HeaderTabs from "@/components/_used-symline/tabs/headerTabs";
import SharedTable from "@/components/SharedTable";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import TagIcon from '@mui/icons-material/Tag';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import BidModal from "@/components/modals/BidModal";
import attachedFiles from "../../../../public/attached-files.json";
import VisibilityIcon from '@mui/icons-material/Visibility';
import RoleBasedRender from "@/hocs/RoleBasedRender";
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { styled } from '@mui/material/styles';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
// this component will has stand alone customer panels
const Page = () => {
  const { i18n } = useTranslation();
  const title = "RFP name";
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const [sendToGroup, setSendToGroup] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [showThread, setShowThread] = React.useState(true);
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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
  const handleThread = (value:boolean) => {
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


  // ----------------- functions ---------------
  const handletabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Head>
        <title>{title} | Symline</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          bgcolor: "primary.lightest",
          borderTopLeftRadius: i18n.language == 'ar' ? 25 : 0,
          borderBottomLeftRadius: i18n.language == 'ar' ? 25 : 25,
          borderTopRightRadius: i18n.language == 'ar' ? 0 : 25,
          borderBottomRightRadius: i18n.language == 'ar' ? 0 : 25,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ mb: 2 }} fontWeight={"bold"}>
            {dictionary(title as TranslatedWord)}
          </Typography>
          <Grid container spacing={2} justifyContent={"space-between"} alignItems={"end"} >
            <Grid item xs={12} sm={10}>

              <HeaderTabs
                value={value}
                handleChange={handletabs}
                tabs={
                  [{
                    title: "Discussion",
                    amount: 0
                  }, {
                    title: "Attached files",
                    amount: 5
                  },
                  {
                    title: "Questions",
                    amount: 3
                  },
                  ]
                }
              />
            </Grid>

            <RoleBasedRender
              componentId="button-bid-rfp"
            >
              <Grid item xs={12} sm={2} sx={{ display: "flex", justifyContent: { sm: 'end', xs: 'start' } }}>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: 8 }}
                >
                  {dictionary("Bid")}
                </Button>
              </Grid>
            </RoleBasedRender>
            <RoleBasedRender
              componentId="buttons-accept-reject-rfp"
            >
              <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: { sm: 'end', xs: 'start' } }}>
                <Button

                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: 8 }}
                >
                  {dictionary("Accept")}
                </Button>
                <Button

                  variant="contained"
                  sx={{
                    borderRadius: 8,
                    color: "#ffffff",
                    backgroundColor: "#6576d9",
                  }}
                >
                  {dictionary("Reject")}
                </Button>
              </Grid>

            </RoleBasedRender>

            <Grid item xs={12} >
              <Card elevation={0} >
                <CustomTabPanel value={value} index={0} padding={'0'}>
                  <Grid container spacing={0} justifyContent="space-between">

                    <Grid  sx={{ transition:'120ms cubic-bezier(0.1, 0.7, 0.6, 0.9)', borderRight: '1px solid lightgrey', display: {
                      xs:  showThread ? 'none': 'block', 
                      md: 'block', 
                    }}} item xs={12} md={showThread ? 7 : 12}>
                    <Grid item xs={12} >
                    <AppBar position="static" >
                      <Container maxWidth="xl">
                        <Toolbar disableGutters>
                         

                          <Box sx={{ flexGrow: 1,  }}>
                            
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
                              <IconButton onClick={()=> (  router.push('/profile'))} sx={{ p: 0 }}>
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
                    
                    <Grid  item xs={12} md={5} sx={{display: showThread ? 'block': 'none', }}>
                    <Grid item xs={12} >
                    <AppBar position="static" >
                      <Container maxWidth="xl">
                        <Toolbar disableGutters>
                         

                        
                          <Box sx={{ flexGrow: 1 , display: 'flex', alignItems:'center'}}>
                          <TagIcon />
                          <Typography variant="subtitle1" sx={{mx:1}}>
                            Thread name
                            
                          </Typography>
                         

                          </Box>
                          <Box sx={{ flexGrow: 0,  transform: 'translate(50%, 0%)'}}>
                            
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
                             <Tooltip title="Send to the general chat" >
                              
                             <Radio name="send"  checked={sendToGroup} onClick={handleRadio} />
                             </Tooltip>
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
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <SharedTable endpoint="http://localhost:3000/attached-files.json"
                    showActions={true}
                    renderRowActions={(row: any) => {
                      return (
                        <SvgIcon style={{
                          cursor: "pointer",
                          color: "#6161d9",
                        }} viewBox="0 0 24 24">
                          <VisibilityIcon />
                        </SvgIcon>
                      )
                    }}

                    fakeData={attachedFiles} />

                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                  <CardContent sx={{ p: 1, direction: 'rtl' }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                      sx={{ p: 1, mb: 3, borderRadius: 1, bgcolor: "primary.lightest" }}
                    >
                      General Questtions
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      What is preferred testing time ?
                    </Typography>
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 4 }}>
                      During the working hours
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      In case of emergency , what is the contact details of the person the assessor
                      should have a contact with :
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                      First person:
                    </Typography>
                    <Grid container spacing={1} justifyContent={"space-between"}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          Name: Jone Doe
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          Email: johndoel@gmail.com
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          Mobile Number: 9876543210
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="body1" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                      First person:
                    </Typography>
                    <Grid container spacing={0} justifyContent={"space-between"}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          Name: Jone Doe
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          Email: johndoel@gmail.com
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          Mobile Number: 9876543210
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                      sx={{ p: 1, mb: 3, borderRadius: 1, bgcolor: "primary.lightest" }}
                    >
                      Web
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      What is preferred testing time ?
                    </Typography>
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 4 }}>
                      Vulnerability assessment
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      ow many web applications you want to assess ?
                    </Typography>
                    <Grid container spacing={0} justifyContent={"space-start"}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          Internal applications: 7
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 4 }}>
                          External applications: 4
                        </Typography>
                      </Grid>
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        List the scoped applications: (i.e.domain.com)
                      </Typography>
                      <Typography variant="h6" fontWeight="light" sx={{ mb: 4 }}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
                        parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
                        pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
                        pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                        rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
                        mollis pretium. Integer tincidunt.
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        4 Is verification required to assess whether the reported Vulnerability have
                        been fixed ?
                      </Typography>
                    </Grid>
                  </CardContent>
                </CustomTabPanel>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <BidModal open={open} handleClose={handleClose} />
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

const Message = ({ name, avatar, message, time, reply, messages, openThread}: any) => {
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
       <Box  sx={{ position: 'relative',}}>
       
        <Typography onClick={handleThread} sx={{'&:hover': {opacity: .7}, cursor:'pointer', display: messages ? 'block': 'none',position: 'absolute', mt:2, py: 2, unicodeBidi: 'embed', direction: 'rtl'}} color="primary" variant="subtitle1" fontWeight="bold">
        4 Messages
        </Typography>
        <Typography onClick={handleThread}  sx={{'&:hover': {opacity: .7}, cursor:'pointer', display: reply ? 'block': 'none', position: 'absolute', mt:2, py: 2, unicodeBidi: 'embed', direction: 'rtl'}} color="primary" variant="subtitle1" fontWeight="bold">
        reply
        </Typography>
       </Box>
      </Box>
     
    </Box>
  );
};