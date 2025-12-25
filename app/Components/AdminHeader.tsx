"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  ListItemAvatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import store from "../lib/store";
import { signOut } from "next-auth/react";

export default function AdminHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const router = useRouter();
  const { logout } = store();

  const menuList = [
    {
      name: "User List",
      icon: <PersonIcon />,
      key: "users",
      path: "/admindashboard/userslist",
    },
    {
      name: "Product List",
      icon: <FactCheckIcon />,
      key: "products",
      path: "/admindashboard/productslist",
    },
  ];

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleMenuClick = (key: string, path: string) => {
    setActiveTab(key);
    router.push(path);
    setDrawerOpen(false);
  };
  const handlelogout = () => {
    signOut();
    logout();
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            backgroundColor: "#1e1e2f",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Admin Panel</Typography>
        </Box>
        <List>
          {menuList.map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton
                selected={activeTab === item.key}
                onClick={() => handleMenuClick(item.key, item.path)}
              >
                <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Top AppBar */}
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1 }}
              className="text-white"
            >
              <Link href="/admindashboard" className="no-underline">
                Admin Dashboard
              </Link>
            </Typography>

            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handlelogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}
