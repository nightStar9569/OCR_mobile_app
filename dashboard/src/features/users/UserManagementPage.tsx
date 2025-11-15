import { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  Chip,
  Typography,
  InputAdornment,
  SelectChangeEvent,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface User {
  userId: string;
  name: string;
  email: string;
  role: 'Admin' | 'Supervisor';
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

// Mock data
const mockUsers: User[] = [
  {
    userId: 'USR001',
    name: 'John Smith',
    email: 'john.smith@utility.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2025-11-13 09:30',
  },
  {
    userId: 'USR002',
    name: 'Sarah Johnson',
    email: 'sarah.j@utility.com',
    role: 'Supervisor',
    status: 'Active',
    lastLogin: '2025-11-13 08:45',
  },
  {
    userId: 'USR003',
    name: 'Mike Davis',
    email: 'mike.d@utility.com',
    role: 'Supervisor',
    status: 'Active',
    lastLogin: '2025-11-13 10:15',
  },
  {
    userId: 'USR004',
    name: 'Emily Brown',
    email: 'emily.b@utility.com',
    role: 'Supervisor',
    status: 'Active',
    lastLogin: '2025-11-12 16:20',
  },
  {
    userId: 'USR005',
    name: 'Robert Wilson',
    email: 'robert.w@utility.com',
    role: 'Supervisor',
    status: 'Inactive',
    lastLogin: '2025-11-10 14:30',
  },
  {
    userId: 'USR006',
    name: 'Lisa Anderson',
    email: 'lisa.a@utility.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2025-11-13 09:00',
  },
  {
    userId: 'USR007',
    name: 'David Martinez',
    email: 'david.m@utility.com',
    role: 'Supervisor',
    status: 'Active',
    lastLogin: '2025-11-13 07:30',
  },
];

export const UserManagementPage = () => {
  const [users] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const rowsPerPage = 7;

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRoleFilter(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setOpenDialog(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setOpenDialog(true);
  };

  const handleDeleteUser = (userId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete user:', userId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
  };

  const handleSaveUser = () => {
    // TODO: Implement save functionality
    console.log('Save user:', editingUser);
    setOpenDialog(false);
  };

  // Filter users based on search, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* Filters Section */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 3,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <TextField
          placeholder="Search users by name, email, or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            flexGrow: 1,
            minWidth: 300,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
        <Select
          value={roleFilter}
          onChange={handleRoleChange}
          sx={{
            minWidth: 150,
            borderRadius: 2,
          }}
        >
          <MenuItem value="All Roles">All Roles</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Supervisor">Supervisor</MenuItem>
        </Select>
        <Select
          value={statusFilter}
          onChange={handleStatusChange}
          sx={{
            minWidth: 150,
            borderRadius: 2,
          }}
        >
          <MenuItem value="All Status">All Status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            bgcolor: 'grey.900',
            '&:hover': {
              bgcolor: 'grey.800',
            },
          }}
        >
          Add User
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>User ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Last Login</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.userId}
                sx={{
                  '&:hover': {
                    bgcolor: 'grey.50',
                  },
                }}
              >
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    size="small"
                    sx={{
                      borderRadius: 1,
                      border: 1,
                      borderColor: 'grey.300',
                      bgcolor: 'transparent',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    size="small"
                    sx={{
                      borderRadius: 1,
                      border: 1,
                      borderColor: user.status === 'Active' ? 'success.main' : 'grey.300',
                      bgcolor: 'transparent',
                      color: user.status === 'Active' ? 'success.main' : 'text.secondary',
                    }}
                  />
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => handleEditUser(user)}
                    sx={{ mr: 0.5 }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteUser(user.userId)}
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Showing {(page - 1) * rowsPerPage + 1}-
          {Math.min(page * rowsPerPage, filteredUsers.length)} of {filteredUsers.length} users
        </Typography>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Box>

      {/* Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField label="Name" fullWidth required />
            <TextField label="Email" type="email" fullWidth required />
            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select label="Role" defaultValue="">
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Supervisor">Supervisor</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select label="Status" defaultValue="Active">
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            {!editingUser && <TextField label="Password" type="password" fullWidth required />}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveUser}
            variant="contained"
            sx={{
              textTransform: 'none',
              bgcolor: 'grey.900',
              '&:hover': {
                bgcolor: 'grey.800',
              },
            }}
          >
            {editingUser ? 'Save Changes' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

