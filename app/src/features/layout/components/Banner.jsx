import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Chip,
  Stack,
 
} from "@mui/material";
import { NavLink } from "react-router-dom";

export const Banner = () => {

    return (
        <>
            {/* HERO */}
            <Box component="header" sx={{ py: { xs: 6, md: 10 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">

                        {/* Texto */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Chip
                                label="Controla tus finanzas diarias"
                                color="primary"
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />

                            <Typography
                                variant="h4"
                                md="h3"
                                fontWeight="bold"
                                sx={{
                                    fontSize: { xs: "2rem", md: "2.8rem" }
                                }}
                            >
                                Registra, clasifica y visualiza tus{" "}
                                <Box component="span" color="primary.main">
                                    gastos diarios
                                </Box>
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mt: 2 }}
                            >
                                Crea presupuestos, recibe alertas y genera reportes por mes en segundos.
                            </Typography>

                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={2}
                                sx={{ mt: 4 }}
                            >
                                <Button variant="contained" size="large" component={NavLink} to="/register">
                                    Empieza gratis
                                </Button>
                                <Button color="black" variant="outlined" size="large" component={NavLink} to="https://github.com/carloscastrox/tf_react"><GitHubIcon/> Repo GitHub
                                </Button>
                                 
                            </Stack>
                        </Grid>

                        {/* Imagen */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                component="img"
                                src="/img/gastos.jpg"
                                alt="Vista app"
                                sx={{
                                    width: "100%",
                                    borderRadius: 3,
                                    boxShadow: 3
                                }}
                            />
                        </Grid>

                    </Grid>
                </Container>
            </Box>
        </>
    )
}