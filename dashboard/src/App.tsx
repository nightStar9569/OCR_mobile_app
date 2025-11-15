import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/Layout/AppLayout';
import { AnalyticsPage } from './features/analytics/AnalyticsPage';
import { ExceptionsPage } from './features/exceptions/ExceptionsPage';
import LoginPage from './features/auth/LoginPage';
import { ReadingsPage } from './features/readings/ReadingsPage';
import { RequireAuth } from './features/auth/RequireAuth';
import { UserManagementPage } from './features/users/UserManagementPage';
import { CustomerManagementPage } from './features/customers/CustomerManagementPage';

const App = () => {
  return (
    <Routes>
       <Route path="/login" element={<LoginPage />} />
       <Route
         path="/"
         element={
           <RequireAuth>
             <AppLayout />
           </RequireAuth>
         }
       >
         <Route index element={<AnalyticsPage />} />
         <Route path="users" element={<UserManagementPage />} />
         <Route path="customers" element={<CustomerManagementPage />} />
         <Route path="readings" element={<ReadingsPage />} />
         <Route path="exceptions" element={<ExceptionsPage />} />
       </Route>
     </Routes>
  );
};

export default App;

