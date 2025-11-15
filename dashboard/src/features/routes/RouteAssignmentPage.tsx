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
  InputLabel,
  LinearProgress,
  MenuItem,
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
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface Route {
  routeId: string;
  routeName: string;
  assignedTo: string;
  meters: number;
  status: 'In Progress' | 'Completed' | 'Pending' | 'Scheduled';
  progress: number;
}

interface Reader {
  name: string;
  activeRoutes: number;
  completedToday: number;
  status: 'Busy' | 'Available';
}

// Mock data
const mockRoutes: Route[] = [
  {
    routeId: 'RT-001',
    routeName: 'Downtown District A',
    assignedTo: 'Mike Davis',
    meters: 45,
    status: 'In Progress',
    progress: 60,
  },
  {
    routeId: 'RT-002',
    routeName: 'North Residential Zone',
    assignedTo: 'Emily Brown',
    meters: 38,
    status: 'Completed',
    progress: 100,
  },
  {
    routeId: 'RT-003',
    routeName: 'Industrial Park West',
    assignedTo: 'David Martinez',
    meters: 52,
    status: 'In Progress',
    progress: 35,
  },
  {
    routeId: 'RT-004',
    routeName: 'South Commercial Area',
    assignedTo: 'Unassigned',
    meters: 41,
    status: 'Pending',
    progress: 0,
  },
  {
    routeId: 'RT-005',
    routeName: 'East Suburbs Route',
    assignedTo: 'Mike Davis',
    meters: 33,
    status: 'Scheduled',
    progress: 0,
  },
  {
    routeId: 'RT-006',
    routeName: 'Central Business District',
    assignedTo: 'Emily Brown',
    meters: 48,
    status: 'Completed',
    progress: 100,
  },
];

const mockReaders: Reader[] = [
  {
    name: 'Mike Davis',
    activeRoutes: 2,
    completedToday: 41,
    status: 'Busy',
  },
  {
    name: 'Emily Brown',
    activeRoutes: 1,
    completedToday: 86,
    status: 'Available',
  },
  {
    name: 'David Martinez',
    activeRoutes: 1,
    completedToday: 18,
    status: 'Busy',
  },
  {
    name: 'Lisa Anderson',
    activeRoutes: 0,
    completedToday: 0,
    status: 'Available',
  },
];

export const RouteAssignmentPage = () => {
  const [routes] = useState<Route[]>(mockRoutes);
  const [readers] = useState<Reader[]>(mockReaders);
  const [routeFilter, setRouteFilter] = useState('All Routes');
  const [dateFilter, setDateFilter] = useState('Today');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  // Calculate stats
  const totalRoutes = routes.length;
  const inProgress = routes.filter((r) => r.status === 'In Progress').length;
  const completedToday = routes.filter((r) => r.status === 'Completed').length;
  const unassigned = routes.filter((r) => r.assignedTo === 'Unassigned').length;

  const handleRouteFilterChange = (event: SelectChangeEvent) => {
    setRouteFilter(event.target.value);
  };

  const handleDateFilterChange = (event: SelectChangeEvent) => {
    setDateFilter(event.target.value);
  };

  const handleCreateRoute = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAssignRoute = (route: Route) => {
    setSelectedRoute(route);
    setOpenAssignDialog(true);
  };

  const handleCloseAssignDialog = () => {
    setOpenAssignDialog(false);
    setSelectedRoute(null);
  };

  const getStatusColor = (status: Route['status']) => {
    switch (status) {
      case 'Completed':
        return 'success.main';
      case 'In Progress':
        return 'info.main';
      case 'Pending':
        return 'warning.main';
      case 'Scheduled':
        return 'grey.600';
      default:
        return 'grey.400';
    }
  };

  // Filter routes
  const filteredRoutes = routes.filter((route) => {
    if (routeFilter === 'All Routes') return true;
    return route.status === routeFilter || route.assignedTo === routeFilter;
  });

  return (
    <Box sx={{ width: '100%' }}>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Routes
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {totalRoutes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {inProgress}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Completed Today
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {completedToday}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Unassigned
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {unassigned}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Route Assignments Section */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Route Assignments
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Select value={routeFilter} onChange={handleRouteFilterChange} size="small">
                  <MenuItem value="All Routes">All Routes</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Scheduled">Scheduled</MenuItem>
                </Select>
                <Select value={dateFilter} onChange={handleDateFilterChange} size="small">
                  <MenuItem value="Today">Today</MenuItem>
                  <MenuItem value="This Week">This Week</MenuItem>
                  <MenuItem value="This Month">This Month</MenuItem>
                </Select>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleCreateRoute}
                  sx={{
                    bgcolor: 'grey.900',
                    '&:hover': { bgcolor: 'grey.800' },
                    textTransform: 'none',
                  }}
                >
                  Create Route
                </Button>
              </Box>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Route ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Route Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Assigned To</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Meters</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Progress</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRoutes.map((route) => (
                    <TableRow
                      key={route.routeId}
                      sx={{
                        '&:hover': { bgcolor: 'grey.50', cursor: 'pointer' },
                      }}
                      onClick={() => handleAssignRoute(route)}
                    >
                      <TableCell>{route.routeId}</TableCell>
                      <TableCell>{route.routeName}</TableCell>
                      <TableCell>{route.assignedTo}</TableCell>
                      <TableCell>{route.meters}</TableCell>
                      <TableCell>
                        <Chip
                          label={route.status}
                          size="small"
                          sx={{
                            borderRadius: 1,
                            fontWeight: 500,
                            bgcolor: 'transparent',
                            border: 1,
                            borderColor: getStatusColor(route.status),
                            color: getStatusColor(route.status),
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={route.progress}
                            sx={{
                              flexGrow: 1,
                              height: 8,
                              borderRadius: 1,
                              bgcolor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                bgcolor:
                                  route.progress === 100
                                    ? 'success.main'
                                    : route.progress > 0
                                      ? 'info.main'
                                      : 'grey.400',
                                borderRadius: 1,
                              },
                            }}
                          />
                          <Typography variant="body2" sx={{ minWidth: 40 }}>
                            {route.progress}%
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Available Readers Section */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Available Readers
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {readers.map((reader, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    '&:hover': { boxShadow: 2 },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {reader.name}
                      </Typography>
                      <Chip
                        label={reader.status}
                        size="small"
                        sx={{
                          borderRadius: 1,
                          fontWeight: 500,
                          bgcolor: 'transparent',
                          border: 1,
                          borderColor:
                            reader.status === 'Available' ? 'success.main' : 'grey.400',
                          color: reader.status === 'Available' ? 'success.main' : 'grey.600',
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Active Routes: {reader.activeRoutes}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Completed Today: {reader.completedToday}
                    </Typography>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        mt: 2,
                        textTransform: 'none',
                        borderRadius: 1,
                      }}
                    >
                      Assign Route
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Route Map View Section */}
      <Paper sx={{ p: 3, mt: 3, borderRadius: 2, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LocationOnIcon />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Route Map View
          </Typography>
        </Box>
        <Box
          sx={{
            height: 400,
            bgcolor: 'grey.50',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LocationOnIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Interactive Map View
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Route visualization and planning
          </Typography>
        </Box>
      </Paper>

      {/* Create Route Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>Create New Route</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField label="Route Name" fullWidth required />
            <TextField label="Description" fullWidth multiline rows={2} />
            <TextField label="Estimated Meters" type="number" fullWidth required />
            <FormControl fullWidth>
              <InputLabel>Assign To</InputLabel>
              <Select label="Assign To" defaultValue="">
                <MenuItem value="">Unassigned</MenuItem>
                {readers.map((reader) => (
                  <MenuItem key={reader.name} value={reader.name}>
                    {reader.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select label="Priority" defaultValue="Normal">
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleCloseDialog} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            sx={{
              bgcolor: 'grey.900',
              '&:hover': { bgcolor: 'grey.800' },
              textTransform: 'none',
            }}
          >
            Create Route
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assign Route Dialog */}
      <Dialog
        open={openAssignDialog}
        onClose={handleCloseAssignDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>Assign Route</DialogTitle>
        <DialogContent>
          {selectedRoute && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Route ID"
                value={selectedRoute.routeId}
                disabled
                fullWidth
              />
              <TextField
                label="Route Name"
                value={selectedRoute.routeName}
                disabled
                fullWidth
              />
              <TextField
                label="Meters"
                value={selectedRoute.meters}
                disabled
                fullWidth
              />
              <FormControl fullWidth required>
                <InputLabel>Assign To</InputLabel>
                <Select label="Assign To" defaultValue={selectedRoute.assignedTo}>
                  {readers.map((reader) => (
                    <MenuItem key={reader.name} value={reader.name}>
                      {reader.name} ({reader.status})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleCloseAssignDialog} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseAssignDialog}
            sx={{
              bgcolor: 'grey.900',
              '&:hover': { bgcolor: 'grey.800' },
              textTransform: 'none',
            }}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

