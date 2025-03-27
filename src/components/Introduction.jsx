import React, { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// Replace with your actual Mapbox Access Token
const MAPBOX_ACCESS_TOKEN = "sk.eyJ1IjoibWFyd2FuYWJhcmlzIiwiYSI6ImNtOHE4NDZ1OTBpaWoya3F4MzA5MW15bmoifQ.2RRhuXBpb2407_1j-YvamA";

function Introduction() {
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const fromContainerRef = useRef(null);
  const toContainerRef = useRef(null);

  useEffect(() => {
    if (!MAPBOX_ACCESS_TOKEN) return;

    const setupGeocoder = (containerRef, inputRef) => {
      if (!containerRef.current || !inputRef.current) return;

      const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_ACCESS_TOKEN,
        types: "place,postcode,address",
        marker: false,
        mapboxgl: mapboxgl,
        placeholder: inputRef.current.placeholder, // Set placeholder dynamically
      });

      // Append the Geocoder inside the container
      containerRef.current.appendChild(geocoder.onAdd());

      // Listen for a selection and update the input value
      geocoder.on("result", (e) => {
        inputRef.current.value = e.result.place_name;
      });

      // Hide the default Geocoder input field (but keep the dropdown functional)
      setTimeout(() => {
        const geocoderInput = containerRef.current.querySelector(".mapboxgl-ctrl-geocoder input");
        if (geocoderInput) {
          geocoderInput.style.display = "none";
        }
      }, 500);
    };

    setupGeocoder(fromContainerRef, fromInputRef);
    setupGeocoder(toContainerRef, toInputRef);
  }, []);

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

      {/* Current Location Input */}
      <Box sx={{ position: "relative" }}>
        <TextField
          inputRef={fromInputRef}
          variant="outlined"
          placeholder="Current Location"
          fullWidth
          sx={{
            marginBottom: 2,
            "& fieldset": { borderRadius: "10px" },
          }}
        />
        {/* Geocoder Dropdown Container */}
        <Box ref={fromContainerRef} sx={{ position: "absolute", top: "100%", left: 0, width: "100%" }} />
      </Box>

      {/* Destination Input */}
      <Box sx={{ position: "relative" }}>
        <TextField
          inputRef={toInputRef}
          variant="outlined"
          placeholder="Destination"
          fullWidth
          sx={{
            marginBottom: 2,
            "& fieldset": { borderRadius: "10px" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* Geocoder Dropdown Container */}
        <Box ref={toContainerRef} sx={{ position: "absolute", top: "100%", left: 0, width: "100%" }} />
      </Box>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#70B994",
          height: "56px",
          width: "230px",
          fontSize: "18px",
          fontWeight: "500",
          borderRadius: "10px",
          px: "20px",
          my: 2,
        }}
      >
        Get Estimates
      </Button>
    </Box>
  );
}

export default Introduction;
