import Header from "./components/Header";
import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SmallHeader from "./components/SmallHeader";
import PaitentLogin from "./features/auth/PaitentLogin";
import DoctorLogin from "./features/auth/DoctorLogin";
import SignUpFormPaitent from "./features/auth/SignUpFormPaitent";
import Doctor from "./pages/Doctor";
import SignUpFormDoctor from "./features/auth/SignUpFormDoctor";
import GetAppointments from "./features/appointment/GetAppointment";
import UserProfile from "./features/user/userProfile";
import UpdateDoctorsAppointment from "./features/appointment/UpdateDoctorAppointment";
import UpdatePatinentAppointment from "./features/appointment/UpdatePaitentAppointment";
import NewAppointmentFrom from "./features/appointment/NewAppointmentForm";
import CreateAdmin from "./features/admin/CreateAdmin";
import LoginAdmin from "./features/admin/LoginAdmin";
import RequireAuth from "./features/auth/requireAuth";
import ViewAllDoctors from "./features/admin/ViewAllDoctors";
import ViewAllPaitents from "./features/admin/ViewAllPaitents";
import NotFound from "./components/NotFound";
export default function App() {
  return (
    <>
      <Header />
      <SmallHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/paitent/auth" element={<PaitentLogin />} />
        <Route path="/doctor/auth" element={<DoctorLogin />} />
        <Route path="/admin/auth" element={<LoginAdmin />} />
        <Route path="/paitent/register" element={<SignUpFormPaitent />} />
        <Route path="/doctor/register" element={<SignUpFormDoctor />} />

        {/* appoinitements */}
        <Route path="appointment">
        <Route path=":id" element={<GetAppointments />} />
        <Route
          path="update-doctor/:id/:status/:name"
          element={<UpdateDoctorsAppointment />}
        />
        <Route
          path="update-patitent/:id/:status/:date/:time"
          element={<UpdatePatinentAppointment />}
        />
        <Route path="new/:id" element={<NewAppointmentFrom />} />
        </Route>

        {/* user */}
        <Route path="/user/profile" element={<UserProfile />} />


        {/* admin routes */}
        <Route element={<RequireAuth allowedRole={["admin"]} />}>
        <Route path="admin" >
          <Route path="new" element={<CreateAdmin/>}  />
          <Route path="doctors/all" element={<ViewAllDoctors/>}  />
          <Route path="paitent/all" element={<ViewAllPaitents/>}  />
        </Route>

        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
}
