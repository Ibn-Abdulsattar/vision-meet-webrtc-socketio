import { Box, Typography } from '@mui/material'

function RightImage({path, width, height}) {
  return (
    <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: { xs: "100%", md: "auto" },
          }}
        >
          {/* Glow behind image */}
          <Box
            sx={{
              position: "absolute",
              width: width,
              height: height,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Image frame */}
          <Box
            sx={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid #1e3a5f",
              background: "#111827",
              maxWidth: { xs: 260, md: 360 },
              width: "100%",
              boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
            }}
          >
            {/* Frame top bar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1.25,
                borderBottom: "1px solid #1e3a5f",
                bgcolor: "#0d1117",
              }}
            >
              {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                <Box
                  key={c}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: c,
                    opacity: 0.7,
                  }}
                />
              ))}
              <Typography
                sx={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.2)",
                  fontFamily: "monospace",
                  letterSpacing: "0.08em",
                  ml: 1,
                }}
              >
                vision-meet.app
              </Typography>
            </Box>
            <img
              src={path}
              alt="Vision Meet preview"
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
          </Box>
        </Box>
  )
}

export default RightImage