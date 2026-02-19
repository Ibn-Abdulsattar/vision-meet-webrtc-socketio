import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import useUiStore from "../stores/ui.store.js";

export default function GlobalAlert() {
  const alerts = useUiStore((state) => state.alerts);
  const removeAlert = useUiStore((state) => state.removeAlert);

  if (alerts.length === 0) return null;

  return (
    <Slide direction="down" in={alerts.length > 0} mountOnEnter unmountOnExit>
      <div>
        {alerts.map((alert, index) => (
          <Alert key={index}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => removeAlert(index)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={{
              position: "fixed",
              top: 20,
              left: "30%",
              right: "30%",
              transform: "translateX(-50%)",
              zIndex: 9999,
              minWidth: "20rem",
              maxWidth: "37.5rem",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
              backdropFilter: "blur(8px)",
              borderRadius: "12px",
              fontSize: "0.95rem",
              fontWeight: 500,
              "& .MuiAlert-icon": {
                fontSize: "1.5rem",
              },
              "& .MuiAlert-message": {
                padding: "8px 0",
                display: "flex",
                alignItems: "center",
              },
              "@media (max-width: 600px)": {
                left: "2rem",
                right: "2rem",
                transform: "none",
              },
            }}
            severity={alert.type}
          >
            {alert.message}
          </Alert>
        ))}
      </div>
    </Slide>
  );
}
