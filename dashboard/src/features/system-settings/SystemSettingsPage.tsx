import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Typography,
  Chip,
} from '@mui/material';

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
      {title}
    </Typography>
    {children}
  </Paper>
);

export const SystemSettingsPage = () => {
  const [tab, setTab] = useState(0);

  // General
  const [systemName, setSystemName] = useState('Utility Meter Reader');
  const [companyName, setCompanyName] = useState('Utility Services Inc.');
  const [timeZone, setTimeZone] = useState('UTC-05:00 (Eastern Time)');
  const [language, setLanguage] = useState('English');
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD');

  // Reading configuration
  const [autoApprove, setAutoApprove] = useState(95);
  const [manualReview, setManualReview] = useState(75);
  const [anomalyRange, setAnomalyRange] = useState(25);
  const [readingFrequency, setReadingFrequency] = useState('Monthly');
  const [enableAutoSync, setEnableAutoSync] = useState(true);
  const [sendExceptionNoti, setSendExceptionNoti] = useState(true);
  const [batchOcr, setBatchOcr] = useState(false);

  // Notification settings
  const [adminEmail, setAdminEmail] = useState('admin@utility.com');
  const [alertRecipients, setAlertRecipients] = useState('email1@utility.com, email2@utility.com');
  const [dailySummary, setDailySummary] = useState(true);
  const [highPriority, setHighPriority] = useState(true);
  const [syncFailures, setSyncFailures] = useState(false);
  const [ocrAlerts, setOcrAlerts] = useState(false);

  // Data retention
  const [imageRetention, setImageRetention] = useState(90);
  const [logRetention, setLogRetention] = useState(365);
  const [archiveLocation, setArchiveLocation] = useState('/storage/archive/');

  // OCR Configuration
  const [ocrEngine, setOcrEngine] = useState('Google ML Kit');
  const [enableDeskew, setEnableDeskew] = useState(true);
  const [enableDenoise, setEnableDenoise] = useState(true);
  const [enableContrast, setEnableContrast] = useState(true);
  const [cropPadding, setCropPadding] = useState(8);
  const [minConfidence, setMinConfidence] = useState(0.75);
  const [maxProcessingMs, setMaxProcessingMs] = useState(1500);
  const [trainingOptIn, setTrainingOptIn] = useState(true);

  // Integrations
  const [firebaseProjectId, setFirebaseProjectId] = useState('utility-meter-reader');
  const [storageBucket, setStorageBucket] = useState('utility-mr.appspot.com');
  const [apiBaseUrl, setApiBaseUrl] = useState('http://localhost:3000');
  const [smtpHost, setSmtpHost] = useState('smtp.mailprovider.com');
  const [smtpUser, setSmtpUser] = useState('noreply@utility.com');
  const [webhookUrl, setWebhookUrl] = useState('https://webhook.site/example');
  const [webhookSecret, setWebhookSecret] = useState('');

  // Security
  const [mfaRequired, setMfaRequired] = useState(false);
  const [sessionTimeoutMin, setSessionTimeoutMin] = useState(60);
  const [allowedOrigins, setAllowedOrigins] = useState('http://localhost:5173');
  const [adminApiKey, setAdminApiKey] = useState('pk_live_admin_xxxxx');
  const [roles] = useState([
    { key: 'admin', name: 'Admin', description: 'Full access to all settings and data' },
    { key: 'supervisor', name: 'Supervisor', description: 'Manage users and review/analytics' },
  ]);

  const handleTabChange = (_: unknown, value: number) => setTab(value);

  const RightInfo = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <SectionCard title="System Information">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">Version</Typography>
            <Typography variant="body2">v3.2.1</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">Database</Typography>
            <Typography variant="body2">PostgreSQL 14.5</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">Server Status</Typography>
            <Typography variant="body2">● Online</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">Last Backup</Typography>
            <Typography variant="body2">2025-11-13 02:00</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary">Uptime</Typography>
            <Typography variant="body2">45 days, 12 hours</Typography>
          </Grid>
        </Grid>
      </SectionCard>

      <SectionCard title="API Status">
        <Grid container spacing={2}>
          {['REST API', 'OCR Service', 'Sync Service', 'Email Service'].map((s) => (
            <Grid key={s} item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">{s}</Typography>
                <Button size="small" variant="outlined">Active</Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </SectionCard>

      <SectionCard title="License Information">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">License Type</Typography>
            <Typography variant="body2">Enterprise</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">Valid Until</Typography>
            <Typography variant="body2">2026-12-31</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">Max Users</Typography>
            <Typography variant="body2">100</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">Max Devices</Typography>
            <Typography variant="body2">50</Typography>
          </Grid>
        </Grid>
      </SectionCard>
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab label="General Settings" />
          <Tab label="OCR Configuration" />
          <Tab label="Integration Settings" />
          <Tab label="Security & Access" />
        </Tabs>
      </Paper>

      {tab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <SectionCard title="General Settings">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <TextField
                      label="System Name"
                      fullWidth
                      value={systemName}
                      onChange={(e) => setSystemName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <Select value={timeZone} onChange={(e: SelectChangeEvent) => setTimeZone(e.target.value)}>
                        <MenuItem value="UTC-05:00 (Eastern Time)">UTC-05:00 (Eastern Time)</MenuItem>
                        <MenuItem value="UTC+00:00 (UTC)">UTC+00:00 (UTC)</MenuItem>
                        <MenuItem value="UTC+05:30 (IST)">UTC+05:30 (IST)</MenuItem>
                      </Select>
                      <Typography variant="caption" color="text.secondary">Time Zone</Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Company Name"
                      fullWidth
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Select value={language} onChange={(e: SelectChangeEvent) => setLanguage(e.target.value)}>
                        <MenuItem value="English">English</MenuItem>
                        <MenuItem value="French">French</MenuItem>
                        <MenuItem value="Spanish">Spanish</MenuItem>
                      </Select>
                      <Typography variant="caption" color="text.secondary">Default Language</Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Select value={dateFormat} onChange={(e: SelectChangeEvent) => setDateFormat(e.target.value)}>
                        <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                        <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                        <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                      </Select>
                      <Typography variant="caption" color="text.secondary">Date Format</Typography>
                    </FormControl>
                  </Grid>
                </Grid>
              </SectionCard>

              <SectionCard title="Reading Configuration">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Auto-approve Threshold (%)"
                      type="number"
                      fullWidth
                      value={autoApprove}
                      onChange={(e) => setAutoApprove(Number(e.target.value))}
                      helperText="OCR confidence threshold for auto-approval"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Manual Review Threshold (%)"
                      type="number"
                      fullWidth
                      value={manualReview}
                      onChange={(e) => setManualReview(Number(e.target.value))}
                      helperText="Below this requires manual review"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Anomaly Detection Range (%)"
                      type="number"
                      fullWidth
                      value={anomalyRange}
                      onChange={(e) => setAnomalyRange(Number(e.target.value))}
                      helperText="Deviation from expected consumption"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Select
                        value={readingFrequency}
                        onChange={(e: SelectChangeEvent) => setReadingFrequency(e.target.value)}
                      >
                        <MenuItem value="Daily">Daily</MenuItem>
                        <MenuItem value="Weekly">Weekly</MenuItem>
                        <MenuItem value="Monthly">Monthly</MenuItem>
                      </Select>
                      <Typography variant="caption" color="text.secondary">Reading Frequency</Typography>
                    </FormControl>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormControlLabel
                    control={<Checkbox checked={enableAutoSync} onChange={(e) => setEnableAutoSync(e.target.checked)} />}
                    label="Enable automatic data sync"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sendExceptionNoti}
                        onChange={(e) => setSendExceptionNoti(e.target.checked)}
                      />
                    }
                    label="Send notifications for exceptions"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={batchOcr} onChange={(e) => setBatchOcr(e.target.checked)} />}
                    label="Enable batch OCR processing"
                  />
                </Box>
              </SectionCard>

              <SectionCard title="Notification Settings">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField label="Admin Email" fullWidth value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Alert Recipients (comma-separated)"
                      fullWidth
                      value={alertRecipients}
                      onChange={(e) => setAlertRecipients(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                  <FormControlLabel control={<Checkbox checked={dailySummary} onChange={(e) => setDailySummary(e.target.checked)} />} label="Daily summary reports" />
                  <FormControlLabel control={<Checkbox checked={highPriority} onChange={(e) => setHighPriority(e.target.checked)} />} label="High priority exceptions" />
                  <FormControlLabel control={<Checkbox checked={syncFailures} onChange={(e) => setSyncFailures(e.target.checked)} />} label="Sync failures" />
                  <FormControlLabel control={<Checkbox checked={ocrAlerts} onChange={(e) => setOcrAlerts(e.target.checked)} />} label="OCR performance alerts" />
                </Box>
              </SectionCard>

              <SectionCard title="Data Retention & Storage">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Image Retention (days)"
                      type="number"
                      fullWidth
                      value={imageRetention}
                      onChange={(e) => setImageRetention(Number(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Log Retention (days)"
                      type="number"
                      fullWidth
                      value={logRetention}
                      onChange={(e) => setLogRetention(Number(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Archive Location"
                      fullWidth
                      value={archiveLocation}
                      onChange={(e) => setArchiveLocation(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="caption" color="text.secondary">Current Storage Used</Typography>
                        <Typography variant="h6">142 GB</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="caption" color="text.secondary">Available Storage</Typography>
                        <Typography variant="h6">358 GB</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="caption" color="text.secondary">Images Stored</Typography>
                        <Typography variant="h6">45,621</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="caption" color="text.secondary">Database Size</Typography>
                        <Typography variant="h6">8.4 GB</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
                  <Button variant="contained" sx={{ bgcolor: 'grey.900', '&:hover': { bgcolor: 'grey.800' } }}>Save All Settings</Button>
                  <Button variant="outlined">Reset to Defaults</Button>
                  <Button variant="outlined">Export Configuration</Button>
                </Box>
              </SectionCard>
            </Box>
          </Grid>

          {/* Right side info */}
          <Grid item xs={12} lg={4}>
            <RightInfo />
          </Grid>
        </Grid>
      )}

      {tab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <SectionCard title="OCR Engine & Performance">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Select value={ocrEngine} onChange={(e: SelectChangeEvent) => setOcrEngine(e.target.value)}>
                        <MenuItem value="Google ML Kit">Google ML Kit (on-device)</MenuItem>
                        <MenuItem value="Tesseract">Tesseract (server-side)</MenuItem>
                      </Select>
                      <Typography variant="caption" color="text.secondary">Engine</Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Max Processing Time (ms)"
                      type="number"
                      fullWidth
                      value={maxProcessingMs}
                      onChange={(e) => setMaxProcessingMs(Number(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Minimum Confidence (0 - 1)"
                      type="number"
                      inputProps={{ step: 0.01, min: 0, max: 1 }}
                      fullWidth
                      value={minConfidence}
                      onChange={(e) => setMinConfidence(Number(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Crop Padding (px)"
                      type="number"
                      fullWidth
                      value={cropPadding}
                      onChange={(e) => setCropPadding(Number(e.target.value))}
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormControlLabel control={<Checkbox checked={enableDeskew} onChange={(e) => setEnableDeskew(e.target.checked)} />} label="Deskew image" />
                  <FormControlLabel control={<Checkbox checked={enableDenoise} onChange={(e) => setEnableDenoise(e.target.checked)} />} label="Denoise / median blur" />
                  <FormControlLabel control={<Checkbox checked={enableContrast} onChange={(e) => setEnableContrast(e.target.checked)} />} label="Auto-contrast & histogram equalization" />
                  <FormControlLabel control={<Checkbox checked={trainingOptIn} onChange={(e) => setTrainingOptIn(e.target.checked)} />} label="Send low-confidence samples to ML training pool" />
                </Box>
              </SectionCard>

              <SectionCard title="Testing & Diagnostics">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField label="Test Image URL" placeholder="Paste image URL to test OCR" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button variant="outlined">Upload Image</Button>
                      <Button variant="contained" sx={{ bgcolor: 'grey.900', '&:hover': { bgcolor: 'grey.800' } }}>Run OCR</Button>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', border: 1, borderColor: 'grey.200', borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary">Preview</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    The OCR result and processing breakdown will appear here.
                  </Typography>
                </Box>
              </SectionCard>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RightInfo />
          </Grid>
        </Grid>
      )}

      {tab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <SectionCard title="Backend & Firebase">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField label="API Base URL" fullWidth value={apiBaseUrl} onChange={(e) => setApiBaseUrl(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="Firebase Project ID" fullWidth value={firebaseProjectId} onChange={(e) => setFirebaseProjectId(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="Storage Bucket" fullWidth value={storageBucket} onChange={(e) => setStorageBucket(e.target.value)} />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button variant="outlined">Test Connection</Button>
                  <Button variant="outlined">Sync Service Accounts</Button>
                </Box>
              </SectionCard>

              <SectionCard title="Email Provider (SMTP)">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField label="SMTP Host" fullWidth value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="SMTP User" fullWidth value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="SMTP Password" fullWidth type="password" />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button variant="outlined">Send Test Email</Button>
                </Box>
              </SectionCard>

              <SectionCard title="Webhooks">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField label="Webhook URL" fullWidth value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="Secret (HMAC)" fullWidth type="password" value={webhookSecret} onChange={(e) => setWebhookSecret(e.target.value)} />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button variant="outlined">Send Sample Event</Button>
                  <Button variant="outlined">Rotate Secret</Button>
                </Box>
              </SectionCard>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RightInfo />
          </Grid>
        </Grid>
      )}

      {tab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <SectionCard title="Role-Based Access">
                <Grid container spacing={2}>
                  {roles.map((r) => (
                    <Grid key={r.key} item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{r.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{r.description}</Typography>
                          <Box sx={{ mt: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {r.key === 'admin' && (
                              <>
                                <Chip size="small" label="Settings" />
                                <Chip size="small" label="Users" />
                                <Chip size="small" label="Analytics" />
                                <Chip size="small" label="Readings" />
                              </>
                            )}
                            {r.key === 'supervisor' && (
                              <>
                                <Chip size="small" label="Review" />
                                <Chip size="small" label="Analytics" />
                              </>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </SectionCard>

              <SectionCard title="Policies & Authentication">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel control={<Checkbox checked={mfaRequired} onChange={(e) => setMfaRequired(e.target.checked)} />} label="Require MFA for all users" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Session Timeout (minutes)"
                      type="number"
                      fullWidth
                      value={sessionTimeoutMin}
                      onChange={(e) => setSessionTimeoutMin(Number(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Allowed Origins (CORS)"
                      fullWidth
                      helperText="Comma-separated list of allowed dashboard origins"
                      value={allowedOrigins}
                      onChange={(e) => setAllowedOrigins(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </SectionCard>

              <SectionCard title="API Keys">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <TextField label="Admin API Key" fullWidth value={adminApiKey} type="password" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button variant="outlined">Reveal</Button>
                      <Button variant="outlined">Regenerate</Button>
                    </Box>
                  </Grid>
                </Grid>
              </SectionCard>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" sx={{ bgcolor: 'grey.900', '&:hover': { bgcolor: 'grey.800' } }}>Save Security Settings</Button>
                <Button variant="outlined">Revoke All Sessions</Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RightInfo />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
