import CtrlBtn from "./CTRLBTN";
import {
  Badge,
  Box,
  IconButton,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ChatIcon from "@mui/icons-material/Chat";

export default function ControlBar({
  handleVideo,
  video,
  handleAudio,
  audio,
  endCall,
  handleScreen,
  screen,
  newMessages,
  handleChatModule,
  showModel,
}) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        mx: "13px",
        mb: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        py: 1.5,
        px: 3,
        background: "#111827",
        border: "1px solid #1e3a5f",
        borderRadius: "12px",
      }}
    >
      <CtrlBtn onClick={handleVideo} active={!video}>
        {video ? (
          <VideocamIcon fontSize="small" />
        ) : (
          <VideocamOffIcon fontSize="small" />
        )}
      </CtrlBtn>

      <CtrlBtn onClick={handleAudio} active={!audio}>
        {audio ? <MicIcon fontSize="small" /> : <MicOffIcon fontSize="small" />}
      </CtrlBtn>

      {/* divider */}
      <Box sx={{ width: 1, height: 28, bgcolor: "#1e3a5f", mx: 0.5 }} />

      {/* End call */}
      <IconButton
        onClick={endCall}
        sx={{
          bgcolor: "#dc2626",
          border: "1px solid rgba(239,68,68,0.5)",
          color: "#fff",
          borderRadius: "10px",
          px: 3,
          py: "10px",
          "&:hover": { bgcolor: "#b91c1c" },
        }}
      >
        <CallEndIcon fontSize="small" />
      </IconButton>

      {/* divider */}
      <Box sx={{ width: 1, height: 28, bgcolor: "#1e3a5f", mx: 0.5 }} />

      <CtrlBtn onClick={handleScreen} active={screen}>
        {screen ? (
          <StopScreenShareIcon fontSize="small" />
        ) : (
          <ScreenShareIcon fontSize="small" />
        )}
      </CtrlBtn>

      <Badge
        badgeContent={newMessages}
        sx={{
          "& .MuiBadge-badge": {
            bgcolor: "#3b82f6",
            color: "#fff",
            fontSize: 9,
            minWidth: 10,
            height: 15,
            top: 4,
            right: 4,
          },
        }}
      >
        <CtrlBtn onClick={handleChatModule} active={showModel}>
          {showModel ? (
            <SpeakerNotesOffIcon fontSize="small" />
          ) : (
            <ChatIcon fontSize="small" />
          )}
        </CtrlBtn>
      </Badge>
    </Box>
  );
}
