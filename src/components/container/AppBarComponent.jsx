import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Tooltip } from "@mui/material";
import UserContext from "../../context/contexts/UserContext";
import UserDrawer from "./UserDrawer";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AppBarComponent({ prop }) {
  const [open, setOpen] = useState(false);
  const { users, loggedUserId, getUsers, setLoggedUserId } = useContext(UserContext);
  const [loggedUser, setLoggedUser] = useState("");
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
    if (loggedUserId === "") {
      const token = localStorage.getItem("credentials");
      setLoggedUserId(token);
    }
    const user = users.find((user) => {
      return user.userId === loggedUserId;
    });
    if (user) {
      setLoggedUser(user.name);
    }
  }, [users]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleListItem = (e) => {
 
    const id = e.target.id;
    switch (id) {
      case "dashboard":
        navigate("/dashboard");
        break;
      case "vehicles":
        navigate("/canvassingvehicles");
        break;
      case "rooms":
        navigate("/stockerrooms");
        break;
      case "reports":
        navigate("/weeklyreports");
        break;
      case "config":
        navigate("/configuration");
        break;
      default:
        break;
      case "logout":
        logout();
        break;
    }
  };
  const [bool, setBool] = useState(false);

  const handleUserIconClick = () => {
    setBool(!bool);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
        <UserDrawer open={bool} setOpen={setOpen} userName={loggedUser} />
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Florida Youth Summit
            </Typography>
            <Tooltip title={`Welcome ${loggedUser}`} placement="bottom">
              <IconButton color="inherit" onClick={handleUserIconClick}>
                <Avatar style={{ bgcolor: "potato" }} alt={loggedUser}></Avatar>
              </IconButton>
            </Tooltip>
                
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <Tooltip title="as" placement="bottom">
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton id="dashboard" onClick={handleListItem}>
              <ListItemIcon id="dashboard" onClick={handleListItem}>
                <DashboardIcon id="dashboard" onClick={handleListItem} />
              </ListItemIcon>
              <ListItemText
                id="dashboard"
                onClick={handleListItem}
                primary="Dashboard"
              />
            </ListItemButton>
            <ListItemButton id="vehicles" onClick={handleListItem}>
              <ListItemIcon id="vehicles" onClick={handleListItem}>
                <TimeToLeaveIcon id="vehicles" onClick={handleListItem} />
              </ListItemIcon>
              <ListItemText
                id="vehicles"
                onClick={handleListItem}
                primary="Van's"
              />
            </ListItemButton>
            <ListItemButton id="rooms" onClick={handleListItem}>
              <ListItemIcon id="rooms" onClick={handleListItem}>
                <WarehouseIcon id="rooms" onClick={handleListItem} />
              </ListItemIcon>
              <ListItemText
                id="rooms"
                onClick={handleListItem}
                primary="Stocker Rooms"
              />
            </ListItemButton>
            <ListItemButton id="reports" onClick={handleListItem}>
              <ListItemIcon id="reports" onClick={handleListItem}>
                <BarChartIcon id="reports" onClick={handleListItem} />
              </ListItemIcon>
              <ListItemText
                id="reports"
                onClick={handleListItem}
                primary="Reportes"
              />
            </ListItemButton>
               <ListItemButton id="config" onClick={handleListItem}>
              <ListItemIcon id="config" onClick={handleListItem}>
                <SettingsIcon id="config" onClick={handleListItem} />
              </ListItemIcon>
              <ListItemText
                id="config"
                onClick={handleListItem}
                primary="Configuracion"
              />
            </ListItemButton>
            <ListItemButton
              id="logout"
              onClick={handleListItem}
              style={{ backgroundColor: "tomato" }}
            >
              <ListItemIcon id="logout" onClick={handleListItem}>
                <LogoutIcon id="logout" onClick={handleListItem} />
              </ListItemIcon>
              <ListItemText
                id="logout"
                onClick={handleListItem}
                primary="Log out"
              />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {prop}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
