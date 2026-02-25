import React, { useEffect } from "react";
import Navbar from "../../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { motion } from "framer-motion";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
         const res = await axios.get(
          //  `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
            `https://jobify-app-g41j.onrender.com/api/v1/application/${params.id}/applicants`,
           { withCredentials: true },
         );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <motion.div
        className="max-w-5xl mx-auto p-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1
          className="font-bold text-xl my-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Applicants: {applicants?.applications?.length || 0}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ApplicantsTable />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Applicants;
