import { Box, Typography } from '@mui/material'

export default function TopBar({videos}) {
  return (
    <Box
            sx={{
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 1, sm: 2 },
              borderBottom: "1px solid #1e3a5f",
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#3b82f6",
                }}
              />
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                }}
              >
                Meeting Room
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.2)",
                borderRadius: "6px",
                px: 1.5,
                py: 0.4,
              }}
            >
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  bgcolor: "#22c55e",
                }}
              />
              <Typography
                sx={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "monospace",
                  letterSpacing: "0.1em",
                }}
              >
                LIVE · {1 + videos.length} PARTICIPANT
                {videos.length !== 0 ? "S" : ""}
              </Typography>
            </Box>
          </Box>
  )
}
