import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

// Slow, smooth staggered container
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // Increased for slower cascade
      delayChildren: 0.3,
    },
  },
};

// Slower job card animation
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2, // Slower animation
      ease: "easeOut",
    },
  },
};

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <motion.div
        className="max-w-6xl mx-auto px-6 sm:px-10 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }} // Slower page fade-in
      >
        <motion.div
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }} // Slower header animation
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {allJobs.length > 0 ? "Available Job Openings" : "No Jobs Found"}
          </h1>
          <p className="text-gray-600">
            {allJobs.length} {allJobs.length === 1 ? "job" : "jobs"} found based
            on your search
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {allJobs.map((job) => (
            <motion.div key={job._id} variants={cardVariants}>
              <Job job={job} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Browse;
