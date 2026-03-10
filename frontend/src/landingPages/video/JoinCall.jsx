import React from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

export default function JoinCall({username, setUsername, localVideoRef, connect}) {
  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "#0d1117",
      p:{xs:2, sm:3},
    }}>
      <Box sx={{
        width: "100%",
        maxWidth: 520,
        bgcolor: "#111827",
        border: "1px solid #1e3a5f",
        borderRadius: 3,
        p: {xs: "25px 20px",sm:"40px 36px"},
      }}>

        {/* Header */}
        <Box sx={{
          display: "inline-block",
          bgcolor: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.25)",
          borderRadius: "6px",
          px: 1.5,
          py: 0.5,
          mb: 3,
        }}>
          <Typography sx={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "#3b82f6",
            fontFamily: "monospace",
          }}>
            ● LIVE SESSION
          </Typography>
        </Box>

        <Typography variant="h4" sx={{
          fontWeight:{xs:700, sm: 700},
          fontSize: {xs: "25px !important",sm:"30px !important"},
          color: "#ffffff",
          letterSpacing: "-0.02em",
          textAlign: "center",
          mb: 1,
        }}>
          Enter your username
        </Typography>

        <Typography sx={{
          fontSize: 14,
          color: "rgba(255,255,255,0.4)",
          mb: 4,
        }}>
          This is how others will see you in the call.
        </Typography>

        {/* Form */}
        <form onSubmit={connect}>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. john_doe"
            fullWidth
            autoComplete="off"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                bgcolor: "#0d1117",
                "& fieldset": {
                  borderColor: "#1e3a5f",
                },
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                  borderWidth: "1.5px",
                },
              },
              "& .MuiOutlinedInput-input": {
                color: "#ffffff",
                fontSize: 15,
                fontFamily: "monospace",
                py: "13px",
                px: "16px",
                "&::placeholder": {
                  color: "rgba(255,255,255,0.2)",
                  opacity: 1,
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            disabled={!username.trim()}
            sx={{
              borderRadius: "10px",
              py: "12px",
              fontSize: 15,
              fontWeight: 600,
              textTransform: "none",
              letterSpacing: "0.01em",
              bgcolor: username.trim() ? "#2563eb" : "rgba(255,255,255,0.05)",
              color: username.trim() ? "#ffffff" : "rgba(255,255,255,0.25)",
              boxShadow: username.trim() ? "0 4px 16px rgba(37,99,235,0.35)" : "none",
              "&:hover": {
                bgcolor: username.trim() ? "#1d4ed8" : "rgba(255,255,255,0.05)",
                boxShadow: username.trim() ? "0 6px 20px rgba(37,99,235,0.45)" : "none",
              },
              "&.Mui-disabled": {
                color: "rgba(255,255,255,0.25)",
              },
            }}
          >
            Join →
          </Button>
        </form>

        {/* Divider */}
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          my: 3,
        }}>
          <Box sx={{ flex: 1, height: "1px", bgcolor: "#1e3a5f" }} />
          <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", fontFamily: "monospace" }}>
            PREVIEW
          </Typography>
          <Box sx={{ flex: 1, height: "1px", bgcolor: "#1e3a5f" }} />
        </Box>

        {/* Video */}
        <Box sx={{
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid #1e3a5f",
          bgcolor: "#0d1117",
          aspectRatio: "16/9",
        }}>
          <Box sx={{
            position: "absolute",
            top: 10,
            left: 12,
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            bgcolor: "rgba(13,17,23,0.8)",
            border: "1px solid #1e3a5f",
            borderRadius: "6px",
            px: 1.25,
            py: 0.5,
            zIndex: 2,
          }}>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#3b82f6" }} />
            <Typography sx={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: "monospace", letterSpacing: "0.08em" }}>
              YOU
            </Typography>
          </Box>

          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </Box>

      </Box>
    </Box>
  )
}
