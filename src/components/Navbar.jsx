import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Stack,
  Link,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

function Navbar({ loggedIn = false }) {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ py: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ color: "#3A5F4F", fontWeight: "bold" }}>
          Ride<span style={{ color: "#6EB995" }}>Buddy</span>
        </Typography>
        {loggedIn ? (
          <Stack spacing={3} direction={"row"}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <LanguageIcon />
                <Typography
                  sx={{ fontWeight: 500, cursor: "pointer", ml: 1 }}
                  color="inherit"
                >
                  EN
                </Typography>
              </Box>
            </Box>

            <Typography
              sx={{ fontWeight: 500, cursor: "pointer" }}
              color="inherit"
            >
              <Link
                sx={{ color: "inherit", textDecoration: "none" }}
                href="/home"
              >
                About
              </Link>
            </Typography>
            <Typography
              sx={{ fontWeight: 500, cursor: "pointer" }}
              color="inherit"
            >
              Hey, Alex!
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={3} direction={"row"}>
            <Typography
              sx={{ fontWeight: 500, cursor: "pointer" }}
              color="inherit"
            >
              Get Started
            </Typography>
            <Typography
              sx={{ fontWeight: 500, cursor: "pointer" }}
              color="inherit"
            >
              Sign In
            </Typography>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
