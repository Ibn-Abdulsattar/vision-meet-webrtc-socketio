import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToHistory } from "../../redux/slices/auth.slice";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stats from "../../components/Stats";
import RightImage from "../../components/RightImage";

function Home() {
  const dispatch = useDispatch();

  const [meetingCode, setMeetingCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(addToHistory({ meetingCode }));
      toast.success("Meeting created successfuly!");
      navigate(`/${meetingCode}`);
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  };

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
      <Navbar mode="history" />

      {/* Hero */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column-reverse", md: "row" },
          gap: { xs: 6, md: 4 },
          px: { xs: 3, sm: 5, md: 10 },
          py: { xs: 6, md: 0 },
          minHeight: "calc(100vh - 69px)",
          maxWidth: 1200,
          mx: "auto",
          width: "100%",
        }}
      >
        {/* ── Left ── */}
        <Box
          sx={{
            maxWidth: { xs: "100%", md: 520 },
            width: "100%",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* Headline */}
          <Typography
            sx={{
              fontSize: { xs: "1.9rem", sm: "2.4rem", md: "3rem" },
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              mb: 1.5,
            }}
          >
            Premium Connectivity
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1.9rem", sm: "2.4rem", md: "3rem" },
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#3b82f6",
              mb: 2.5,
            }}
          >
            for Next-Gen Scholars.
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 14, md: 15 },
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.7,
              mb: 4,
              maxWidth: 420,
              mx: { xs: "auto", md: 0 },
              fontFamily: "monospace",
            }}
          >
            Enter a meeting code to instantly join a session — no downloads, no
            setup. Just clear, reliable HD video.
          </Typography>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              gap: 1.5,
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <TextField
              value={meetingCode}
              variant="outlined"
              label="Meeting Code"
              onChange={(e) => setMeetingCode(e.target.value)}
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  bgcolor: "rgba(255,255,255,0.04)",
                  fontFamily: "monospace",
                  fontSize: 14,
                  color: "#ffffff",
                  "& fieldset": { borderColor: "#1e3a5f" },
                  "&:hover fieldset": { borderColor: "#3b82f6" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3b82f6",
                    borderWidth: "1.5px",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "monospace",
                  fontSize: 13,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#3b82f6",
                },
                "& input": {
                  color: "#ffffff",
                  "&::placeholder": {
                    color: "rgba(255,255,255,0.2)",
                    opacity: 1,
                  },
                },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              endIcon={<ArrowForwardIcon fontSize="small" />}
              sx={{
                borderRadius: "10px",
                px: 3.5,
                py: 1.5,
                textTransform: "none",
                fontWeight: 700,
                fontSize: 14,
                fontFamily: "monospace",
                letterSpacing: "0.04em",
                bgcolor: "#2563eb",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
                whiteSpace: "nowrap",
                "&:hover": {
                  bgcolor: "#1d4ed8",
                  boxShadow: "0 6px 20px rgba(37,99,235,0.45)",
                },
              }}
            >
              Join
            </Button>
          </Box>

          {/* Stats */}
          <Stats />
        </Box>

        {/* ── Right image ── */}
        <RightImage
          path="./logo4.png"
          width={{ xs: 240, md: 360 }}
          height={{ xs: 240, md: 360 }}
        />
      </Box>
    </Box>
  );
}

export default Home;
