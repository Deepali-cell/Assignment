"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Divider,
  Chip,
  Stack,
} from "@mui/material";

const UserC = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/users/${userId}`);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    if (userId) fetchUserData();
  }, [userId]);

  if (!userData)
    return (
      <Typography align="center" mt={4}>
        Loading user...
      </Typography>
    );

  return (
    <Box maxWidth="1100px" mx="auto" mt={4} p={2}>
      {/* Header Card */}
      <Card elevation={4} sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar src={userData.image} sx={{ width: 100, height: 100 }} />
            <Box>
              <Typography variant="h5">
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography color="text.secondary">
                @{userData.username}
              </Typography>

              <Stack direction="row" spacing={1} mt={1}>
                <Chip label={userData.gender} />
                <Chip label={userData.role} color="primary" />
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Info Sections */}
      <Grid container spacing={3}>
        {/* Personal Info */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography>Email: {userData.email}</Typography>
              <Typography>Phone: {userData.phone}</Typography>
              <Typography>Age: {userData.age}</Typography>
              <Typography>Blood Group: {userData.bloodGroup}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Physical Info */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                Physical Details
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography>Height: {userData.height} cm</Typography>
              <Typography>Weight: {userData.weight} kg</Typography>
              <Typography>Eye Color: {userData.eyeColor}</Typography>
              <Typography>
                Hair: {userData.hair?.color}, {userData.hair?.type}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Address */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                Address
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography>
                {userData.address?.address}, {userData.address?.city}
              </Typography>
              <Typography>
                {userData.address?.state}, {userData.address?.country} -{" "}
                {userData.address?.postalCode}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Company */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                Company
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography>Name: {userData.company?.name}</Typography>
              <Typography>
                Department: {userData.company?.department}
              </Typography>
              <Typography>Title: {userData.company?.title}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Bank */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                Bank Details
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography>Card Type: {userData.bank?.cardType}</Typography>
              <Typography>Currency: {userData.bank?.currency}</Typography>
              <Typography>IBAN: {userData.bank?.iban}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Crypto */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                Crypto
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography>Coin: {userData.crypto?.coin}</Typography>
              <Typography>Wallet: {userData.crypto?.wallet}</Typography>
              <Typography>Network: {userData.crypto?.network}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserC;
