import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Navbar from "../../components/Navbar";
import Stats from "../../components/Stats";
import RightImage from "../../components/RightImage";

export default function Landing() {
const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#0d1117",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >

      {/* Navbar */}
      <Navbar/>

      {/* ── Hero ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 6, md: 10 },
          px: { xs: 3, md: 10 },
          py: { xs: 6, md: 0 },
          maxWidth: 1200,
          mx: "auto",
          width: "100%",
        }}
      >
        {/* Left — text */}
        <Box sx={{ flex: 1, maxWidth: 520 }}>
          {/* Tag */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.25)",
              borderRadius: "6px",
              px: 1.5,
              py: 0.5,
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "#3b82f6",
              }}
            />
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#3b82f6",
                fontFamily: "monospace",
                textTransform: "uppercase",
              }}
            >
              HD Video Calling
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: { xs: 30, md: 46 },
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              mb: 2.5,
            }}
          >
            Distance is just{" "}
            <Box component="span" sx={{ color: "#3b82f6" }}>
              a number.
            </Box>
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 15, md: 16 },
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7,
              mb: 4,
              maxWidth: 420,
              fontFamily: "monospace",
              textAlign: { sm: "start", xs: "center" },
            }}
          >
            Vision Meet makes every mile feel like a moment. Connect with
            anyone, anywhere — in crystal-clear HD.
          </Typography>

          {/* CTA row */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              flexWrap: "wrap",
              justifyContent: { xs: "center", sm: "start" },
            }}
          >
            <Button
              component={Link}
              to="/auth"
              endIcon={<ArrowForwardIcon fontSize="small" />}
              sx={{
                bgcolor: "#2563eb",
                color: "#fff",
                fontFamily: "monospace",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "none",
                px: 3,
                py: 1.4,
                borderRadius: "10px",
                boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
                "&:hover": {
                  bgcolor: "#1d4ed8",
                  boxShadow: "0 6px 20px rgba(37,99,235,0.45)",
                },
              }}
            >
              Get Started
            </Button>
            <Button
              onClick={() => navigate("/aljk23")}
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontFamily: "monospace",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "none",
                px: 3,
                py: 1.4,
                borderRadius: "10px",
                border: "1px solid #1e3a5f",
                bgcolor: "rgba(255,255,255,0.03)",
                "&:hover": {
                  color: "#fff",
                  bgcolor: "rgba(255,255,255,0.07)",
                  borderColor: "#3b82f6",
                },
              }}
            >
              Join as Guest
            </Button>
          </Box>

          {/* Stats row */}
          <Stats/>
        </Box>

        {/* Right — image */}
        <RightImage 
          path="/mobile.png" 
          width={{ xs: 220, md: 320 }}
          height={{ xs: 220, md: 320 }} 
        />
      </Box>
    </Box>
  );
}
