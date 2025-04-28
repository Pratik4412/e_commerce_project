import { Outlet } from "react-router-dom";
import "./App.css";
import Headers from "./components/Headers";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/ProductSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
function App() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  const fetchCategories = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: ResponseData } = response;
      if (response.data.success) {
        dispatch(setAllCategory(ResponseData.data));
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };
  const fetchSubCategories = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: ResponseData } = response;
      if (response.data.success) {
        dispatch(setAllSubCategory(ResponseData.data));
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    } finally {
    }
  };
  useEffect(() => {
    fetchUser();
    fetchCategories();
    fetchSubCategories();
  }, []);

  return (
    <>
      <Headers />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
