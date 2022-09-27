import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Explore from "./pages/Explore";
import Category from "./pages/Category";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";
import EditListing from "./pages/EditListing";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/problem-showcase" element={<Explore />} />
          <Route path="/problem-showcase/offers" element={<Offers />} />
          <Route
            path="/problem-showcase/category/:categoryName"
            element={<Category />}
          />
          <Route path="/problem-showcase/profile" element={<PrivateRoute />}>
            <Route path="/problem-showcase/profile" element={<Profile />} />
          </Route>
          <Route path="/problem-showcase/sign-in" element={<SignIn />} />
          <Route path="/problem-showcase/sign-up" element={<SignUp />} />
          <Route
            path="/problem-showcase/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/problem-showcase/create-listing"
            element={<CreateListing />}
          />
          <Route
            path="/problem-showcase/edit-listing/:listingId"
            element={<EditListing />}
          />
          <Route
            path="/problem-showcase/category/:categoryName/:listingId"
            element={<Listing />}
          />
          <Route
            path="/problem-showcase/contact/:landlordId"
            element={<Contact />}
          />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
