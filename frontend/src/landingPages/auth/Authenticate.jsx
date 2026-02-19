import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";  
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { authService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth.store.js";
import useUiStore from "../../stores/ui.store.js";

export default function Authenticate() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    otp: "",
  });
  const [formState, setFormState] = useState(0);
  const mode =
    formState === 0 ? "login" : formState === 1 ? "register" : "forgot";
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const setAlerts = useUiStore((state) => state.setAlerts);

  const switchFormState = (state) => {
    setFormState(state);
  };

  const getTitle = () => {
    switch (formState) {
      case 0:
        return "Sign In";
      case 1:
        return "Sign Up";
      case 2:
        return "Forgot Password";
      case 3:
        return "Verify OTP";
      default:
        return "Sign In";
    }
  };

  const getButtonText = () => {
    switch (formState) {
      case 0:
        return "Sign In";
      case 1:
        return "Sign Up";
      case 2:
        return "Send OTP";
      case 3:
        return "Verify OTP";
      default:
        return "Submit";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (otp) {
        //  VERIFY THE OTP
        const response = await authService.verifyOtp({
          email: formData.email,
          code: formData.otp,
        });
        setUser(response.user);
        setAlerts({
          type: "success",
          message: "Account verified successfully!",
        });
        navigate("/");
      } else {
        // INITIAL SIGNUP OR SIGNIN
        const response = await authService.authenticate(mode,  formData );

        if (mode === "register") {
          // Switch to OTP view instead of logging in
          setOtp(true);
          setFormState(3);
          setAlerts({ type: "success", message: "OTP sent to your email!" });
        } else {
          setUser(response.user);
          setAlerts({ type: "success", message: response.message });
          if (mode === "login") navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.message;
      setAlerts({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          size={{ xs: false, md: 7 }}
          sx={{
            backgroundImage: `url( /jonatan-pie.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid size={{ xs: 12, md: 5 }} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: "auto",
              height: "100vh",
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography
              variant="h4"
              sx={{ fontWeight: "700" }}
              component="h1"
              gutterBottom
              align="center"
            >
              {getTitle()}
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {/* Username */}
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  disabled={loading}
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                />
              )}

              {/* Email  */}
              {(formState === 0 || formState === 1 || formState === 2) && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  disabled={loading}
                  autoFocus={formState !== 1}
                  value={formData.email}
                  onChange={handleChange}
                />
              )}

              {/* Password */}
              {(formState === 0 || formState === 1) && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  disabled={loading}
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                />
              )}

              {/* OTP */}
              {formState === 3 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="Enter OTP"
                  name="otp"
                  value={formData.otp}
                  disabled={loading}
                  autoFocus
                  onChange={handleChange}
                  inputProps={{ maxLength: 6 }}
                />
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {getButtonText()}
              </Button>

              {/* Links to switch between forms */}
              <Box
                sx={{
                  mt: 2,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {formState === 0 && (
                  <>
                    <Link
                      component="button"
                      type="button"
                      variant="body2"
                      onClick={() => switchFormState(2)}
                      sx={{ mr: 2 }}
                    >
                      Forgot password?
                    </Link>
                    <Link
                      component="button"
                      type="button"
                      variant="body2"
                      onClick={() => switchFormState(1)}
                    >
                      Don't have an account? Sign Up
                    </Link>
                  </>
                )}

                {formState === 1 && (
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={() => switchFormState(0)}
                  >
                    Already have an account? Sign In
                  </Link>
                )}

                {formState === 2 && (
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={() => switchFormState(0)}
                  >
                    Back to Sign In
                  </Link>
                )}

                {formState === 3 && (
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={() => switchFormState(formState === 3 ? 2 : 1)}
                  >
                    Resend OTP
                  </Link>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
