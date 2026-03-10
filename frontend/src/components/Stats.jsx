import { Box, Typography } from "@mui/material";

export default function Stats() {
  return (
    <Box sx={{
                display: "flex",
                gap: 3,
                mt: 5,
                pt: 4,
                borderTop: "1px solid #1e3a5f",
                justifyContent: { xs: "center", md: "flex-start" },
                flexWrap: "wrap",
              }}>
                {[
                  { value: "10K+", label: "Active Users" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "HD", label: "Video Quality" },
                ].map((stat) => (
                  <Box key={stat.label}>
                    <Typography sx={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: "#3b82f6",
                      fontFamily: "monospace",
                      letterSpacing: "-0.02em",
                    }}>
                      {stat.value}
                    </Typography>
                    <Typography sx={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.28)",
                      fontFamily: "monospace",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
  )
}
