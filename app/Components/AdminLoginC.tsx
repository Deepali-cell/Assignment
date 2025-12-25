"use client";

import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import store from "../lib/store";

interface LoginData {
  username: string;
  password: string;
}

export default function AdminLoginC() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<LoginData>({ username: "", password: "" });
  const router = useRouter();
  const { setUser } = store();
  const { data: session, status } = useSession();

  // ✅ Typed event
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      toast.error("Please enter username and password");
      return;
    }

    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Invalid credentials");
      return;
    }

    toast.success("Login successful");
    router.push("/admindashboard");
  };

  // 🔑 Sync Zustand after session
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // ✅ Ensure types exist
      const username =
        (session.user as any)?.username || session.user.name || "";
      const role = (session.user as any)?.role || "user";
      setUser(username, role);
      router.replace("/admindashboard");
    }
  }, [status, session, setUser, router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "navy",
      }}
    >
      <Card sx={{ width: 380 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={3}>
            Admin Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              name="username"
              value={data.username}
              onChange={handleChange}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              name="password"
              value={data.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
