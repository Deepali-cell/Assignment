"use client";

import React from "react";
import { useSession } from "next-auth/react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Stack,
  Chip,
} from "@mui/material";

const UserProfile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Typography align="center">Loading profile...</Typography>;
  }

  if (!session) {
    return (
      <Typography align="center" color="error">
        User not logged in
      </Typography>
    );
  }

  const user = session.user;

  return (
    <Box maxWidth="600px" mx="auto" mt={4}>
      <Card elevation={4}>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Avatar src={user.image || ""} sx={{ width: 100, height: 100 }} />

            <Typography variant="h5">{user.username || "No Name"}</Typography>

            <Typography color="text.secondary">{user.email}</Typography>

            <Chip label={user.role || "User"} color="primary" />
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* Extra Info */}
          <Typography>
            <strong>User ID:</strong> {user.id}
          </Typography>

          <Typography>
            <strong>Logged in via:</strong> {"credentials"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
