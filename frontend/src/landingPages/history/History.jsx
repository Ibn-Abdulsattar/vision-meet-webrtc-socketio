import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUserHistory } from "../../redux/slices/auth.slice";
import { userAllHistory} from "../../redux/slices/auth.slice";
import { Box, Typography } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HistoryIcon from "@mui/icons-material/History";

function History() {
  const meetings = useSelector(userAllHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserHistory());
  }, [dispatch]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0d1117" }}>
      <Navbar mode="home" />

      <Box sx={{
        maxWidth: 900,
        mx: "auto",
        px: { xs: 2.5, md: 4 },
        py: { xs: 5, md: 7 },
      }}>

        {/* ── Header ── */}
        <Box sx={{ mb: 6, textAlign: "center" }}>


          <Typography sx={{
            fontSize: { xs: 26, md: 32 },
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            mb: 1,
          }}>
            Meeting History
          </Typography>
        </Box>

        {/* ── Empty state ── */}
        {meetings.length === 0 ? (
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 12,
            border: "1px dashed #1e3a5f",
            borderRadius: "16px",
            bgcolor: "rgba(59,130,246,0.03)",
            gap: 1.5,
          }}>
            <Box sx={{
              width: 52,
              height: 52,
              borderRadius: "14px",
              bgcolor: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}>
              <HistoryIcon sx={{ fontSize: 24, color: "#3b82f6" }} />
            </Box>
            <Typography sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "monospace",
            }}>
              No meetings yet
            </Typography>
            <Typography sx={{
              fontSize: 12,
              color: "rgba(255,255,255,0.25)",
              fontFamily: "monospace",
              letterSpacing: "0.04em",
            }}>
              Your meeting history will appear here
            </Typography>
          </Box>
        ) : (
          <>
            {/* Count badge */}
            <Box sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}>
              <Box sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.2)",
                borderRadius: "6px",
                px: 1.5,
                py: 0.6,
              }}>
                <Typography sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#3b82f6",
                  fontFamily: "monospace",
                  letterSpacing: "0.06em",
                }}>
                  {meetings.length} {meetings.length === 1 ? "MEETING" : "MEETINGS"}
                </Typography>
              </Box>
            </Box>

            {/* Table header — desktop */}
            <Box sx={{
              display: { xs: "none", md: "grid" },
              gridTemplateColumns: "40px 1fr 160px 140px",
              gap: 2,
              px: 2.5,
              py: 1,
              mb: 1,
            }}>
              {["#", "Meeting Code", "Date", "Time"].map((h) => (
                <Typography key={h} sx={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                }}>
                  {h}
                </Typography>
              ))}
            </Box>

            {/* Rows */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {meetings.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "40px 1fr 160px 140px" },
                    gap: { xs: 2, md: 2 },
                    alignItems: "center",
                    bgcolor: "#111827",
                    border: "1px solid #1e3a5f",
                    borderRadius: "12px",
                    px: 2.5,
                    py: 2,
                    "&:hover": {
                      borderColor: "#3b82f6",
                      bgcolor: "rgba(59,130,246,0.05)",
                    },
                    transition: "border-color 0.15s, background-color 0.15s",
                  }}
                >
                  {/* Index */}
                  <Typography sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "rgba(59,130,246,0.45)",
                    fontFamily: "monospace",
                    display: { xs: "none", md: "block" },
                  }}>
                    {String(idx + 1).padStart(2, "0")}
                  </Typography>

                  {/* Meeting code */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "9px",
                      bgcolor: "#2563eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <VideoCallIcon sx={{ fontSize: 18, color: "#fff" }} />
                    </Box>
                    <Box>
                      <Typography sx={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.25)",
                        fontFamily: "monospace",
                        letterSpacing: "0.08em",
                        display: { md: "none" },
                        mb: 0.3,
                      }}>
                        MEETING CODE
                      </Typography>
                      <Typography sx={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#3b82f6",
                        fontFamily: "monospace",
                        letterSpacing: "0.04em",
                        wordBreak: "break-all",
                      }}>
                        {item.meeting_code}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Date */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarTodayIcon sx={{ fontSize: 13, color: "rgba(59,130,246,0.6)", flexShrink: 0 }} />
                    <Box>
                      <Typography sx={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.25)",
                        fontFamily: "monospace",
                        letterSpacing: "0.08em",
                        display: { md: "none" },
                        mb: 0.2,
                      }}>
                        DATE
                      </Typography>
                      <Typography sx={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.65)",
                        fontFamily: "monospace",
                      }}>
                        {formatDate(item.date)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Time */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccessTimeIcon sx={{ fontSize: 13, color: "rgba(59,130,246,0.6)", flexShrink: 0 }} />
                    <Box>
                      <Typography sx={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.25)",
                        fontFamily: "monospace",
                        letterSpacing: "0.08em",
                        display: { md: "none" },
                        mb: 0.2,
                      }}>
                        TIME
                      </Typography>
                      <Typography sx={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.65)",
                        fontFamily: "monospace",
                      }}>
                        {formatTime(item.date)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default History;
