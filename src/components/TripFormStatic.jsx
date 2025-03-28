import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// Replace with your actual Mapbox Access Token
const MAPBOX_ACCESS_TOKEN =
  "sk.eyJ1IjoibWFyd2FuYWJhcmlzIiwiYSI6ImNtOHE4NDZ1OTBpaWoya3F4MzA5MW15bmoifQ.2RRhuXBpb2407_1j-YvamA";

function TripFormStatic() {
  return (
    <Box sx={{ minWidth: "400px", padding: 4 }}>
      <Typography variant="h4" sx={{ color: "black" }}>
        Plan Your Trip
      </Typography>
      <Typography sx={{ marginBottom: 2, fontWeight: 500, py: 3 }}>
        Ride<span style={{ color: "#6EB995" }}>Buddy</span> finds the best deal
        for you.
      </Typography>
      <Typography variant="body1" sx={{ color: "black", mb: 1 }}>
        From
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        // label="From"
        placeholder="Current Location"
        sx={{
          marginBottom: 2,
          "& fieldset": {
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: "#6EB995" }, // Changes focus border to green
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
      <Typography variant="body1" sx={{ color: "black", my: 1 }}>
        To
      </Typography>
      <TextField
        fullWidth
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
            "&.Mui-focused fieldset": { borderColor: "#6EB995" }, // Changes focus border to green
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
      <Typography variant="body1" sx={{ color: "black", my: 1 }}>
        People
      </Typography>
      <TextField
        variant="outlined"
        // label="People"
        defaultValue="1-4"
        sx={{
          marginBottom: 2,
          width: "150px",
          "& fieldset": {
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: "#6EB995" }, // Changes focus border to green
          },
        }}
      />
      <Button
        variant="contained"
        sx={{
          bgcolor: "#8BC48A",
          height: "56px",
          width: "100px",
          ml: "40px",
          fontSize: "18px",
          fontWeight: "500 !important",
          borderRadius: "10px",
          px: "20px !important",
        }}
      >
        Search
      </Button>
    </Box>
  );
}

export default TripFormStatic;
