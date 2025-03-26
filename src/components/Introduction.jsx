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

function Introduction({ heading = true }) {
  const rides = [
    { name: "Bolt", price: "£5.34", cheapest: true, image: "bolt-logo.jpeg" },
    { name: "Uber", price: "£5.48", cheapest: false, image: "uber-logo.png" },
    { name: "Lyft", price: "£5.42", cheapest: false, image: "lyft-logo.png" },
  ];

  return (
    <Box sx={{ minWidth: "400px", padding: 4 }}>
      <Typography variant="h2" sx={{ color: "black", fontWeight: 600 }}>
        Compare the
      </Typography>
      <Typography variant="h2" sx={{ color: "#70B994", fontWeight: 600 }}>
        Latest Deals
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600, py: 4 }}>
        Ride<span style={{ color: "#70B994" }}>Buddy</span> scans various
        ride-sharing apps, such as Uber and Lyft to find you the best possible
        deal on your ride
      </Typography>
      <Box>
        <TextField
          variant="outlined"
          // label="From"
          placeholder="Current Location"
          sx={{
            marginBottom: 2,
            marginRight: 4,
            "& fieldset": {
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "#6EB995" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MyLocationIcon sx={{ fill: "#000000" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          // label="To"
          placeholder="Destination"
          sx={{
            marginBottom: 2,
            "& fieldset": {
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "#6EB995" },
              // background: "white",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#70B994",
          height: "56px",
          width: "230px",
          fontSize: "18px",
          fontWeight: "500 !important",
          borderRadius: "10px",
          px: "20px !important",
          my: 2,
        }}
      >
        Get Estimates
      </Button>
    </Box>
  );
}

export default Introduction;
