import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

interface Customer {
  customerId: string;
  name: string;
  address: string;
  meterCount: number;
  lastReading: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

// Mock data
const mockCustomers: Customer[] = [
  {
    customerId: 'CUST-10234',
    name: 'ABC Corporation',
    address: '123 Main St. City',
    meterCount: 5,
    lastReading: '2025-11-12',
    status: 'Active',
  },
  {
    customerId: 'CUST-10235',
    name: 'XYZ Industries',
    address: '456 Oak Ave. Town',
    meterCount: 12,
    lastReading: '2025-11-13',
    status: 'Active',
  },
  {
    customerId: 'CUST-10236',
    name: 'Smith Residence',
    address: '789 Pine Rd. Village',
    meterCount: 1,
    lastReading: '2025-11-11',
    status: 'Active',
  },
  {
    customerId: 'CUST-10237',
    name: 'Downtown Plaza',
    address: '321 Market St. City',
    meterCount: 8,
    lastReading: '2025-11-13',
    status: 'Active',
  },
  {
    customerId: 'CUST-10238',
    name: 'Johnson Family',
    address: '654 Elm Dr. Suburb',
    meterCount: 1,
    lastReading: '2025-11-10',
    status: 'Inactive',
  },
  {
    customerId: 'CUST-10239',
    name: 'Tech Park Building',
    address: '987 Innovation Blvd',
    meterCount: 15,
    lastReading: '2025-11-12',
    status: 'Active',
  },
  {
    customerId: 'CUST-10240',
    name: 'Green Energy Co',
    address: '147 Solar Way. City',
    meterCount: 3,
    lastReading: '2025-11-13',
    status: 'Active',
  },
  {
    customerId: 'CUST-10241',
    name: 'Williams Apartment',
    address: '258 High St. Town',
    meterCount: 1,
    lastReading: '2025-11-09',
    status: 'Pending',
  },
];

export const CustomerManagementPage = () => {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);

  const rowsPerPage = 8;

  // Calculate stats
  const totalCustomers = customers.length;
  const activeMeters = customers.reduce((sum, c) => sum + c.meterCount, 0);
  const pendingSetup = customers.filter((c) => c.status === 'Pending').length;
  const recentChanges = 8; // Mock value

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleAddCustomer = () => {
    setOpenDialog(true);
    setViewingCustomer(null);
  };

  const handleViewCustomer = (customer: Customer) => {
    setViewingCustomer(customer);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setViewingCustomer(null);
  };

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All Status' || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Paginate
  const paginatedCustomers = filteredCustomers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Customers
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {totalCustomers.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Active Meters
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {activeMeters.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Pending Setup
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {pendingSetup}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Recent Changes
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {recentChanges}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Actions */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search customers by ID, name, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { borderRadius: 2 },
            }}
          />
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
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddCustomer}
            sx={{
              bgcolor: 'grey.900',
              '&:hover': {
                bgcolor: 'grey.800',
              },
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Add Customer
          </Button>
        </Box>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Customer ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Meter Count</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Last Reading</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCustomers.map((customer) => (
              <TableRow
                key={customer.customerId}
                sx={{
                  '&:hover': { bgcolor: 'grey.50' },
                }}
              >
                <TableCell>{customer.customerId}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.meterCount}</TableCell>
                <TableCell>{customer.lastReading}</TableCell>
                <TableCell>
                  <Chip
                    label={customer.status}
                    size="small"
                    sx={{
                      borderRadius: 1,
                      fontWeight: 500,
                      bgcolor:
                        customer.status === 'Active'
                          ? 'transparent'
                          : customer.status === 'Pending'
                            ? 'transparent'
                            : 'transparent',
                      border: 1,
                      borderColor:
                        customer.status === 'Active'
                          ? 'success.main'
                          : customer.status === 'Pending'
                            ? 'warning.main'
                            : 'grey.400',
                      color:
                        customer.status === 'Active'
                          ? 'success.main'
                          : customer.status === 'Pending'
                            ? 'warning.main'
                            : 'text.secondary',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleViewCustomer(customer)}
                      sx={{ color: 'text.secondary' }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'text.secondary' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
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
          mt: 3,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {(page - 1) * rowsPerPage + 1}-
          {Math.min(page * rowsPerPage, filteredCustomers.length)} of{' '}
          {filteredCustomers.length} customers
        </Typography>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Box>

      {/* Add/View Customer Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle>
          {viewingCustomer ? 'Customer Details' : 'Add New Customer'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Customer Name"
              fullWidth
              required
              defaultValue={viewingCustomer?.name || ''}
              disabled={!!viewingCustomer}
            />
            <TextField
              label="Address"
              fullWidth
              required
              multiline
              rows={2}
              defaultValue={viewingCustomer?.address || ''}
              disabled={!!viewingCustomer}
            />
            <TextField
              label="Meter Count"
              type="number"
              fullWidth
              required
              defaultValue={viewingCustomer?.meterCount || 1}
              disabled={!!viewingCustomer}
            />
            {viewingCustomer && (
              <>
                <TextField
                  label="Customer ID"
                  fullWidth
                  defaultValue={viewingCustomer.customerId}
                  disabled
                />
                <TextField
                  label="Last Reading"
                  fullWidth
                  defaultValue={viewingCustomer.lastReading}
                  disabled
                />
              </>
            )}
            <FormControl fullWidth required disabled={!!viewingCustomer}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                defaultValue={viewingCustomer?.status || 'Active'}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleCloseDialog} sx={{ textTransform: 'none' }}>
            {viewingCustomer ? 'Close' : 'Cancel'}
          </Button>
          {!viewingCustomer && (
            <Button
              variant="contained"
              onClick={handleCloseDialog}
              sx={{
                bgcolor: 'grey.900',
                '&:hover': { bgcolor: 'grey.800' },
                textTransform: 'none',
              }}
            >
              Add Customer
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

