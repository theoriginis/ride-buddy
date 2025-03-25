import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import TripForm from "../components/TripForm";
import RideList from "../components/RideList";

function HomePage() {
  return (
    <Box>
      <Navbar loggedIn={true} /> {/* Navbar stays common across pages */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on medium+
          alignItems: "center",
          justifyContent: "space-around",
          padding: { xs: 0, md: 4 }, // Reduce padding for small screens
          gap: { xs: 3, md: 0 }, // Adds spacing between elements on mobile
        }}
      >
        {/* TripForm - Adjust width for responsiveness */}
        <Box sx={{ width: { xs: "90%", md: "35%" } }}>
          <TripForm />
        </Box>

        {/* Responsive Image */}
        <Box
          component="img"
          src="/map.jpg"
          alt="Map"
          sx={{
            display: { xs: "none", md: "block" },
            borderRadius: "10px",
            width: { xs: "90%", md: "30%" }, // Full width on mobile, 30% on desktop
            height: { xs: "auto", md: "600px" }, // Maintain aspect ratio on mobile
            objectFit: "cover", // Ensures proper image fit
          }}
        />

        {/* RideList - Adjust width for responsiveness */}
        <Box sx={{ width: { xs: "90%", md: "30%" } }}>
          <RideList />
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
