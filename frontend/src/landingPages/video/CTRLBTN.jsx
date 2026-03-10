import {  IconButton } from "@mui/material";


function CtrlBtn({ onClick, active, children, sx = {} }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        bgcolor: active ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.04)",
        border: "1px solid",
        borderColor: active ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.08)",
        color: active ? "#3b82f6" : "rgba(255,255,255,0.45)",
        borderRadius: "10px",
        p: {xs:"8px", sm: "13px"},
        "&:hover": {
          bgcolor: active ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.08)",
          borderColor: active ? "rgba(59,130,246,0.6)" : "rgba(255,255,255,0.15)",
        },
        ...sx,
      }}
    >
      {children}
    </IconButton>
  );
};

export default CtrlBtn;
