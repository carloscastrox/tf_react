import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Chip,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const menuItems = [
    { text: "Inicio", link: "/#" },
    { text: "Beneficios", link: "/#beneficios" },
    { text: "Cómo funciona", link: "/#como-funciona" },
    { text: "Precios", link: "/#precios" },
    { text: "Apis", link: "/apis" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <AppBar position="sticky" color="default" elevation={2}>
        <Toolbar>
          <Container
            maxWidth="lg"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <img src="/img/logomoni.png" width="100" alt="logo" />
              {/* <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold" }}>
                Moni
              </Typography> */}
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {menuItems.map((item) => (
                <Button key={item.text}
                  component={HashLink}
                  smooth // Esto hace que el scroll sea animado
                  to={item.link}>
                  {item.text}
                </Button>
              ))}

              <Button variant="contained" component={NavLink} to="/login">
                Iniciar sesión
              </Button>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component="a"
                  href={item.link}
                  onClick={toggleDrawer(false)}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}

            <ListItem>
              <Button
                variant="contained"
                fullWidth
                component={NavLink} to="/login"
                onClick={toggleDrawer(false)}
              >
                Iniciar sesión
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};