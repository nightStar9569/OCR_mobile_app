import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import WarningIcon from '@mui/icons-material/Warning';
import ImageIcon from '@mui/icons-material/Image';

interface ImageReview {
  id: string;
  customerId: string;
  value: string;
  flag: string;
  confidence: number;
  timestamp: string;
  meterId?: string;
  route?: string;
  reader?: string;
}

// Mock data for review queue
const mockReviewQueue: ImageReview[] = [
  {
    id: 'IMG-8234',
    customerId: 'CUST-10234',
    value: '12547',
    flag: 'Low Confidence',
    confidence: 72,
    timestamp: '2025-11-13 10:15',
    meterId: 'MTR-4521',
    route: 'RT-001',
    reader: 'Mike Davis',
  },
  {
    id: 'IMG-8235',
    customerId: 'CUST-10241',
    value: '98432',
    flag: 'Blurry Image',
    confidence: 68,
    timestamp: '2025-11-13 10:12',
    meterId: 'MTR-4522',
    route: 'RT-002',
    reader: 'Emily Brown',
  },
  {
    id: 'IMG-8236',
    customerId: 'CUST-10237',
    value: '45678',
    flag: 'Low Confidence',
    confidence: 73,
    timestamp: '2025-11-13 10:08',
    meterId: 'MTR-4523',
    route: 'RT-001',
    reader: 'Mike Davis',
  },
  {
    id: 'IMG-8237',
    customerId: 'CUST-10239',
    value: '23891',
    flag: 'Poor Lighting',
    confidence: 65,
    timestamp: '2025-11-13 10:05',
    meterId: 'MTR-4524',
    route: 'RT-003',
    reader: 'David Martinez',
  },
];

export const ImageReviewPage = () => {
  const [flagFilter, setFlagFilter] = useState('All Flags');
  const [sortBy, setSortBy] = useState('Timestamp');
  const [selectedImage, setSelectedImage] = useState<ImageReview | null>(null);
  const [manualOverride, setManualOverride] = useState('');

  const handleFlagFilterChange = (event: SelectChangeEvent) => {
    setFlagFilter(event.target.value);
  };

  const handleSortByChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleImageClick = (image: ImageReview) => {
    setSelectedImage(image);
    setManualOverride('');
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
    setManualOverride('');
  };

  const handleApprove = () => {
    console.log('Approved:', selectedImage?.id);
    handleCloseDialog();
    // Move to next image in queue
  };

  const handleReject = () => {
    console.log('Rejected:', selectedImage?.id);
    handleCloseDialog();
    // Move to next image in queue
  };

  const handleSkip = () => {
    console.log('Skipped:', selectedImage?.id);
    handleCloseDialog();
    // Move to next image in queue
  };

  const pendingReview = mockReviewQueue.length;
  const approvedToday = 156;
  const rejectedToday = 23;
  const avgReviewTime = '45s';

  return (
    <Box sx={{ width: '100%' }}>
      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Select value={flagFilter} onChange={handleFlagFilterChange} size="small">
              <MenuItem value="All Flags">All Flags</MenuItem>
              <MenuItem value="Low Confidence">Low Confidence</MenuItem>
              <MenuItem value="Blurry Image">Blurry Image</MenuItem>
              <MenuItem value="Poor Lighting">Poor Lighting</MenuItem>
              <MenuItem value="Partial Obstruction">Partial Obstruction</MenuItem>
            </Select>
            <Select value={sortBy} onChange={handleSortByChange} size="small">
              <MenuItem value="Timestamp">Sort by: Timestamp</MenuItem>
              <MenuItem value="Confidence">Sort by: Confidence</MenuItem>
              <MenuItem value="Customer ID">Sort by: Customer ID</MenuItem>
            </Select>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Pending Reviews: {pendingReview}
          </Typography>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Pending Review
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {pendingReview}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Approved Today
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {approvedToday}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Rejected Today
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {rejectedToday}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Avg Review Time
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {avgReviewTime}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Review Queue List */}
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
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Image Review - {mockReviewQueue[0]?.id}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<ZoomInIcon />}
                size="small"
                onClick={() => handleImageClick(mockReviewQueue[0])}
              >
                Zoom
              </Button>
            </Box>

            {/* Image Display Area */}
            <Box
              sx={{
                height: 400,
                bgcolor: 'grey.50',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                border: 1,
                borderColor: 'grey.200',
              }}
            >
              <ImageIcon sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Meter Image Display
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Camera capture preview
              </Typography>
            </Box>

            {/* Reading Details */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    OCR Reading
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {mockReviewQueue[0]?.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Confidence: {mockReviewQueue[0]?.confidence}%
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Manual Override
                  </Typography>
                  <TextField
                    placeholder="Enter value..."
                    size="small"
                    fullWidth
                    value={manualOverride}
                    onChange={(e) => setManualOverride(e.target.value)}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Optional correction
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Metadata */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Customer ID:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {mockReviewQueue[0]?.customerId}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Meter ID:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {mockReviewQueue[0]?.meterId}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Route:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {mockReviewQueue[0]?.route}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Reader:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {mockReviewQueue[0]?.reader}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Timestamp:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {mockReviewQueue[0]?.timestamp}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Flag Reason:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <WarningIcon fontSize="small" color="warning" />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {mockReviewQueue[0]?.flag}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<CheckIcon />}
                fullWidth
                onClick={handleApprove}
                sx={{
                  bgcolor: 'grey.900',
                  '&:hover': { bgcolor: 'grey.800' },
                  py: 1.5,
                }}
              >
                Approve Reading
              </Button>
              <Button
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={handleReject}
                sx={{
                  borderColor: 'error.main',
                  color: 'error.main',
                  '&:hover': {
                    borderColor: 'error.dark',
                    bgcolor: 'error.50',
                  },
                  minWidth: 150,
                }}
              >
                Reject & Flag
              </Button>
              <Button variant="outlined" onClick={handleSkip} sx={{ minWidth: 100 }}>
                Skip
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Review Queue Sidebar */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Review Queue
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {mockReviewQueue.map((image) => (
                <Card
                  key={image.id}
                  variant="outlined"
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { boxShadow: 2, borderColor: 'primary.main' },
                    bgcolor: selectedImage?.id === image.id ? 'grey.50' : 'white',
                  }}
                  onClick={() => handleImageClick(image)}
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
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {image.id}
                      </Typography>
                      <Chip
                        label={`${image.confidence}%`}
                        size="small"
                        sx={{
                          borderRadius: 1,
                          fontWeight: 500,
                          bgcolor: 'grey.100',
                        }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Customer: {image.customerId}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Value: {image.value}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <WarningIcon fontSize="small" color="warning" />
                      <Typography variant="caption" color="warning.main">
                        {image.flag}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {image.timestamp}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
                Load More
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Zoom Dialog */}
      <Dialog
        open={selectedImage !== null && selectedImage.id !== mockReviewQueue[0]?.id}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          <Box
            sx={{
              height: 600,
              bgcolor: 'grey.50',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ImageIcon sx={{ fontSize: 120, color: 'grey.300', mb: 2 }} />
            <Typography variant="h5" color="text.secondary">
              Meter Image Display
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Camera capture preview
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              {selectedImage?.id}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  OCR Reading: {selectedImage?.value}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Confidence: {selectedImage?.confidence}%
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

