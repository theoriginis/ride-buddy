import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import RideList from "../components/RideList";
import Introduction from "../components/Introduction";

function LoginPage() {
  return (
    <Box sx={{ height: "100vh" }}>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on medium+
          alignItems: "center", // Center content in column mode
          justifyContent: "space-around",
          padding: { xs: 0, md: 4 }, // Reduce padding on small screens
          backgroundImage: "url('/cab-img.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "90vh",
          position: "relative",
        }}
      >
        {/* White Overlay for better readability */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.4)", // Light white overlay
            zIndex: 0,
          }}
        />

        {/* Introduction Section */}
        <Box
          sx={{
            my: { xs: 4, md: 10 }, // Adjust margin for responsiveness
            width: { xs: "90%", md: "40%" }, // Take full width on mobile, half on desktop
            textAlign: { xs: "center", md: "left" }, // Center text on mobile
            zIndex: 1, // Keep above overlay
          }}
        >
          <Introduction />
        </Box>

        {/* Ride List Section */}
        <Box
          sx={{
            background: "#ffffff99",
            borderRadius: "10px",
            height: { xs: "auto", md: "480px" }, // Auto height on small screens
            mx: { xs: 2, md: 20 }, // Adjust margin for better spacing
            my: { xs: 2, md: 10 },
            padding: { xs: 2, md: 3 }, // Add padding for small screens
            // width: { xs: "80%", md: "35%" }, // Responsive width
            zIndex: 1,
          }}
        >
          <RideList heading={false} />
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
