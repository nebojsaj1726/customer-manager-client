import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Container } from '@mui/material';
import Login from './features/user/Login';
import Register from './features/user/Register';
import ProtectedRoute from './routing/ProtectedRoute';
import Home from './features/user/Home';
import Customers from './features/customers/Customers';
import AddCustomer from './features/customers/AddCustomer';
import EditCustomer from './features/customers/EditCustomer';

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/customers" element={<Customers />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/add-customer" element={<AddCustomer />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/edit-customer/">
              <Route path=":id" element={<EditCustomer />} />
            </Route>
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
