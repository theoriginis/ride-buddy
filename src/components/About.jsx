import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";

function About({ heading = true }) {
  const rides = [
    { name: "Bolt", price: "£5.34", cheapest: true, image: "bolt-logo.jpeg" },
    { name: "Uber", price: "£5.48", cheapest: false, image: "uber-logo.png" },
    { name: "Lyft", price: "£5.42", cheapest: false, image: "lyft-logo.png" },
  ];

  return (
    <Box id="about" sx={{ minWidth: "400px", padding: 4 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", color: "#70B994", fontWeight: 600 }}
      >
        Your search engine for rideshares, taxis and limos
      </Typography>
      <Typography sx={{ pt: 3, px: 8 }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Typography>
    </Box>
  );
}

export default About;
