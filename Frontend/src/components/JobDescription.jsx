import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,

        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Axios Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-10 px-6 sm:px-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            {singleJob?.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge className="bg-blue-100 text-blue-700 font-medium">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="bg-red-100 text-red-700 font-medium">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 font-medium">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg transition ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <div className="mt-8 bg-white p-6 rounded-md shadow-sm border">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-700">
          Job Description
        </h2>
        <ul className="space-y-4 text-gray-800 text-sm sm:text-base">
          <li>
            <strong className="block text-gray-600 font-medium">Role:</strong>
            {singleJob?.title}
          </li>
          <li>
            <strong className="block text-gray-600 font-medium">
              Location:
            </strong>
            {singleJob?.location}
          </li>
          <li>
            <strong className="block text-gray-600 font-medium">
              Description:
            </strong>
            {singleJob?.description}
          </li>
          <li>
            <strong className="block text-gray-600 font-medium">
              Experience Required:
            </strong>
            {singleJob?.experience} yrs
          </li>
          <li>
            <strong className="block text-gray-600 font-medium">Salary(LPA):</strong>
            {singleJob?.salary} LPA
          </li>
          <li>
            <strong className="block text-gray-600 font-medium">
              Total Applicants:
            </strong>
            {singleJob?.applications?.length}
          </li>
          <li>
            <strong className="block text-gray-600 font-medium">
              Posted On:
            </strong>
            {singleJob?.createdAt?.split("T")[0]}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JobDescription;
