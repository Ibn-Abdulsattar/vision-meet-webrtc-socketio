import {  IconButton, Box, Typography, TextField } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";

export default function ChatModel({
  messages,
  sendMessage,
  message,
  setMessage,
}) {
  return (
    <Box sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Header */}
      <Box sx={{
        px: 2,
        py: 1.5,
        borderBottom: "1px solid #1e3a5f",
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexShrink: 0,
      }}>
        <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#3b82f6" }} />
        <Typography sx={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)",
          fontFamily: "monospace",
        }}>
          Live Chat
        </Typography>
      </Box>

      {/* Messages */}
      <Box sx={{
        flex: 1,
        overflowY: "auto",
        px: 2,
        py: 1.5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        "&::-webkit-scrollbar": { width: 4 },
        "&::-webkit-scrollbar-track": { background: "transparent" },
        "&::-webkit-scrollbar-thumb": { background: "#1e3a5f", borderRadius: 4 },
      }}>
        {messages.length > 0 ? messages.map((item, idx) => (
          <Box key={idx}>
            <Typography sx={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#3b82f6",
              mb: 0.5,
              fontFamily: "monospace",
            }}>
              {item.sender}
            </Typography>
            <Box sx={{
              background: "rgba(59,130,246,0.07)",
              border: "1px solid rgba(59,130,246,0.15)",
              borderRadius: "2px 8px 8px 8px",
              px: 1.5,
              py: 1,
            }}>
              <Typography sx={{
                fontSize: 13,
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.5,
                fontFamily: "monospace",
              }}>
                {item.data}
              </Typography>
            </Box>
          </Box>
        )) : (
          <Box sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mt: 6,
          }}>
            <ChatIcon sx={{ fontSize: 28, color: "rgba(59,130,246,0.3)" }} />
            <Typography sx={{
              fontSize: 12,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.08em",
              fontFamily: "monospace",
            }}>
              NO MESSAGES YET
            </Typography>
          </Box>
        )}
      </Box>

      {/* Input */}
      <Box sx={{
        px: 1.5,
        py: 1.5,
        borderTop: "1px solid #1e3a5f",
        flexShrink: 0,
      }}>
        <form onSubmit={sendMessage} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: 13,
                color: "rgba(255,255,255,0.85)",
                fontFamily: "monospace",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "8px",
                "& fieldset": { borderColor: "#1e3a5f" },
                "&:hover fieldset": { borderColor: "#3b82f6" },
                "&.Mui-focused fieldset": { borderColor: "#3b82f6", borderWidth: "1.5px" },
              },
              "& input::placeholder": { color: "rgba(255,255,255,0.2)", opacity: 1 },
            }}
          />
          <IconButton
            type="submit"
            sx={{
              bgcolor: "#2563eb",
              color: "#fff",
              borderRadius: "8px",
              width: 36,
              height: 36,
              flexShrink: 0,
              "&:hover": { bgcolor: "#1d4ed8" },
            }}
          >
            <SendIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </form>
      </Box>
    </Box>
  );
}
