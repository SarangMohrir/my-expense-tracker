import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { auth } from './utils/firebase';  // Ensure this is correctly set up
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/DashBoard';
import AddExpense from './components/AddExpense';
import ViewExpenses from './components/ViewExpenses';
import ExpenseChart from './components/ExpenseChart';

const App = () => {
  const [user, setUser] = useState();
  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav>
          <ul>
            {user ? (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/add-expense">Add Expense</Link>
                </li>
                <li>
                  <Link to="/view-expenses">View Expenses</Link>
                </li>
                <li>
                  <Link to="/expense-chart">Expense Chart</Link>
                </li>
                <li>
                  {/* <button onClick={handleLogout}>Logout</button> */}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Authenticated Routes */}
          <Route
            path="/signup"
            element={user ? <Navigate to="/dashboard" /> : <SignUp />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-expense"
            element={user ? <AddExpense /> : <Navigate to="/login" />}
          />
          <Route
            path="/view-expenses"
            element={user ? <ViewExpenses /> : <Navigate to="/login" />}
          />
          <Route
            path="/expense-chart"
            element={user ? <ExpenseChart /> : <Navigate to="/login" />}
          />
          
          {/* Default Route (Redirect to Dashboard or Login) */}
          <Route
            path="*"
            element={<Navigate to={user ? '/dashboard' : '/login'} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
