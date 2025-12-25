"use client";

import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
} from "@mui/material";
import Link from "next/link";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  image: string;
}

let searchTimeout: NodeJS.Timeout;

const UsersList = () => {
  const [displayUsers, setDisplayUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const usersPerPage = 6;

  const fetchUsers = async (page = 1, search = "") => {
    const limit = usersPerPage;
    const skip = (page - 1) * limit;
    try {
      const url = search
        ? `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
      const { data } = await axios.get(url);
      setDisplayUsers(data.users);
      setTotalUsers(data.total);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers(page, search);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setPage(1);

    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      fetchUsers(1, value);
    }, 500);
  };

  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
    fetchUsers(value, search);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} textAlign="center">
        Users List
      </Typography>

      <Box py={2}>
        <TextField
          label="Search users..."
          type="search"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />
      </Box>

      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {displayUsers.length === 0 ? (
          <Typography textAlign="center">No users found.</Typography>
        ) : (
          displayUsers.map((user) => (
            <Link
              key={user.id}
              href={`/admindashboard/user/${user.id}`}
              className="no-underline"
            >
              <Card elevation={3}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                      src={user.image}
                      alt={user.firstName}
                      sx={{ width: 64, height: 64, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6">
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        @{user.username}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Phone:</strong> {user.phone}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Age:</strong> {user.age} | <strong>Gender:</strong>{" "}
                    {user.gender}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </Box>

      {totalUsers > usersPerPage && (
        <Stack spacing={2} mt={4} alignItems="center">
          <Pagination
            count={Math.ceil(totalUsers / usersPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      )}
    </Box>
  );
};

export default UsersList;
