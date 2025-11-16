import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface RecentReport {
  id: string;
  fileName: string;
  date: string;
  size: string;
  format: string;
}

// Mock data
const mockTemplates: ReportTemplate[] = [
  {
    id: 'daily-reading',
    title: 'Daily Reading Summary',
    description: 'Summary of all readings collected in a day',
    category: 'Operational',
  },
  {
    id: 'monthly-billing',
    title: 'Monthly Billing Report',
    description: 'Customer billing data for the month',
    category: 'Financial',
  },
  {
    id: 'exception-analysis',
    title: 'Exception Analysis',
    description: 'Detailed analysis of exceptions and anomalies',
    category: 'Quality',
  },
  {
    id: 'route-performance',
    title: 'Route Performance',
    description: 'Performance metrics by route and reader',
    category: 'Performance',
  },
  {
    id: 'ocr-accuracy',
    title: 'OCR Accuracy Report',
    description: 'OCR system performance and accuracy trends',
    category: 'Technical',
  },
  {
    id: 'consumption-trends',
    title: 'Customer Consumption Trends',
    description: 'Usage patterns and consumption analysis',
    category: 'Analytics',
  },
];

const mockRecentReports: RecentReport[] = [
  {
    id: '1',
    fileName: 'Daily_Reading_Summary_2025-11-13.pdf',
    date: '2025-11-13 10:30',
    size: '2.4 MB',
    format: 'PDF',
  },
  {
    id: '2',
    fileName: 'Exception_Analysis_Weekly.xlsx',
    date: '2025-11-13 09:15',
    size: '1.8 MB',
    format: 'Excel',
  },
  {
    id: '3',
    fileName: 'Monthly_Billing_Report_October.pdf',
    date: '2025-11-12 14:20',
    size: '5.2 MB',
    format: 'PDF',
  },
  {
    id: '4',
    fileName: 'Route_Performance_2025-Q4.csv',
    date: '2025-11-11 16:45',
    size: '856 KB',
    format: 'CSV',
  },
];

export const ReportsGeneratorPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [startDate, setStartDate] = useState('2025-11-01');
  const [endDate, setEndDate] = useState('2025-11-13');
  const [routeSelection, setRouteSelection] = useState('All Routes');
  const [customerCategory, setCustomerCategory] = useState('All Categories');
  const [reader, setReader] = useState('All Readers');
  const [exportFormat, setExportFormat] = useState('PDF');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [frequency, setFrequency] = useState('Daily');
  const [scheduleTime, setScheduleTime] = useState('--:--');
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const reportsGenerated = 247;
  const scheduledReports = 12;
  const avgGenerationTime = '4.2s';

  const handleTemplateChange = (event: SelectChangeEvent) => {
    setSelectedTemplate(event.target.value);
  };

  const handleRouteChange = (event: SelectChangeEvent) => {
    setRouteSelection(event.target.value);
  };

  const handleCustomerCategoryChange = (event: SelectChangeEvent) => {
    setCustomerCategory(event.target.value);
  };

  const handleReaderChange = (event: SelectChangeEvent) => {
    setReader(event.target.value);
  };

  const handleFrequencyChange = (event: SelectChangeEvent) => {
    setFrequency(event.target.value);
  };

  const handleGenerateReport = () => {
    console.log('Generate report:', {
      template: selectedTemplate,
      startDate,
      endDate,
      routeSelection,
      customerCategory,
      reader,
      exportFormat,
      scheduleEnabled,
      frequency,
      scheduleTime,
    });
  };

  const handlePreview = () => {
    console.log('Preview report');
  };

  const handleSaveAsTemplate = () => {
    console.log('Save as template');
  };

  const handleDownload = (reportId: string) => {
    console.log('Download report:', reportId);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
      Operational: 'info',
      Financial: 'success',
      Quality: 'warning',
      Performance: 'primary',
      Technical: 'secondary',
      Analytics: 'default',
    };
    return colors[category] || 'default';
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Reports Generated
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {reportsGenerated}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                This month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Scheduled Reports
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {scheduledReports}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Active schedules
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Avg Generation Time
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {avgGenerationTime}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Last 30 days
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Main Content: Generate New Report */}
        <Grid item xs={12} lg={7}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Generate New Report
            </Typography>

            {/* Report Template */}
            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth>
                <Select
                  value={selectedTemplate}
                  onChange={handleTemplateChange}
                  displayEmpty
                  sx={{ mb: 1 }}
                >
                  <MenuItem value="" disabled>
                    Select a report template...
                  </MenuItem>
                  {mockTemplates.map((template) => (
                    <MenuItem key={template.id} value={template.id}>
                      {template.title}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="caption" color="text.secondary">
                  Choose from pre-configured report templates
                </Typography>
              </FormControl>
            </Box>

            {/* Date Range */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
            </Grid>

            {/* Report Filters - Collapsible */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  mb: 2,
                }}
                onClick={() => setFiltersExpanded(!filtersExpanded)}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Report Filters
                </Typography>
                <IconButton size="small">
                  {filtersExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              <Collapse in={filtersExpanded}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <Select value={routeSelection} onChange={handleRouteChange} size="small">
                        <MenuItem value="All Routes">All Routes</MenuItem>
                        <MenuItem value="RT-001">RT-001</MenuItem>
                        <MenuItem value="RT-002">RT-002</MenuItem>
                        <MenuItem value="RT-003">RT-003</MenuItem>
                      </Select>
                      <FormLabel sx={{ mt: 1, fontSize: '0.75rem' }}>Route Selection</FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <Select
                        value={customerCategory}
                        onChange={handleCustomerCategoryChange}
                        size="small"
                      >
                        <MenuItem value="All Categories">All Categories</MenuItem>
                        <MenuItem value="Residential">Residential</MenuItem>
                        <MenuItem value="Commercial">Commercial</MenuItem>
                        <MenuItem value="Industrial">Industrial</MenuItem>
                      </Select>
                      <FormLabel sx={{ mt: 1, fontSize: '0.75rem' }}>
                        Customer Category
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <Select value={reader} onChange={handleReaderChange} size="small">
                        <MenuItem value="All Readers">All Readers</MenuItem>
                        <MenuItem value="Mike Davis">Mike Davis</MenuItem>
                        <MenuItem value="Emily Brown">Emily Brown</MenuItem>
                        <MenuItem value="David Martinez">David Martinez</MenuItem>
                      </Select>
                      <FormLabel sx={{ mt: 1, fontSize: '0.75rem' }}>Reader</FormLabel>
                    </FormControl>
                  </Grid>
                </Grid>
              </Collapse>
            </Box>

            {/* Export Format */}
            <Box sx={{ mb: 3 }}>
              <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
                Export Format
              </FormLabel>
              <RadioGroup
                row
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
              >
                <FormControlLabel value="PDF" control={<Radio />} label="PDF" />
                <FormControlLabel value="Excel" control={<Radio />} label="Excel" />
                <FormControlLabel value="CSV" control={<Radio />} label="CSV" />
              </RadioGroup>
            </Box>

            {/* Schedule this report */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={scheduleEnabled}
                    onChange={(e) => setScheduleEnabled(e.target.checked)}
                  />
                }
                label="Schedule this report"
              />
              {scheduleEnabled && (
                <Box sx={{ ml: 4, mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Select value={frequency} onChange={handleFrequencyChange} size="small">
                          <MenuItem value="Daily">Daily</MenuItem>
                          <MenuItem value="Weekly">Weekly</MenuItem>
                          <MenuItem value="Monthly">Monthly</MenuItem>
                        </Select>
                        <FormLabel sx={{ mt: 1, fontSize: '0.75rem' }}>Frequency</FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Time"
                        placeholder="--:--"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        size="small"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<DescriptionIcon />}
                onClick={handleGenerateReport}
                sx={{
                  bgcolor: 'grey.900',
                  '&:hover': { bgcolor: 'grey.800' },
                  flex: 1,
                  minWidth: 150,
                  py: 1.5,
                }}
              >
                Generate Report
              </Button>
              <Button
                variant="outlined"
                startIcon={<VisibilityIcon />}
                onClick={handlePreview}
                sx={{ flex: 1, minWidth: 120 }}
              >
                Preview
              </Button>
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={handleSaveAsTemplate}
                sx={{ flex: 1, minWidth: 150 }}
              >
                Save as Template
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right Sidebar: Report Templates & Recent Reports */}
        <Grid item xs={12} lg={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Report Templates */}
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Report Templates
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {mockTemplates.map((template) => (
                  <Card
                    key={template.id}
                    variant="outlined"
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { boxShadow: 2, borderColor: 'primary.main' },
                    }}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 1,
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {template.title}
                        </Typography>
                        <Chip
                          label={template.category}
                          size="small"
                          color={getCategoryColor(template.category)}
                          sx={{ ml: 1 }}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {template.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>

            {/* Recent Reports */}
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Recent Reports
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {mockRecentReports.map((report) => (
                  <Box
                    key={report.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {report.fileName}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          {report.date}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {report.size}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleDownload(report.id)}
                      sx={{ ml: 2 }}
                    >
                      Download
                    </Button>
                  </Box>
                ))}
                <Link
                  component="button"
                  variant="body2"
                  sx={{ mt: 1, textAlign: 'center' }}
                  onClick={() => console.log('View all reports')}
                >
                  View All Reports
                </Link>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

