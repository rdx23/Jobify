import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Load saved jobs from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(saved);
    setIsSaved(saved.some((item) => item._id === job._id));
  }, [job._id]);

  // Save for Later button handler
  const handleSave = () => {
    const updatedSavedJobs = [...savedJobs, job];
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
    setSavedJobs(updatedSavedJobs);
    setIsSaved(true);
    toast.success("Job saved for later!");
  };

  // Bookmark toggle handler
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={toggleBookmark}
        >
          {isBookmarked ? (
            <BookmarkCheck className="text-green-600" />
          ) : (
            <Bookmark />
          )}
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location || "Location"}</p>
        </div>
      </div>

      {/* Title and Description */}
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 mt-4">
        <Badge className="bg-blue-100 text-blue-700 font-medium">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-red-100 text-red-700 font-medium">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-100 text-purple-700 font-medium">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button
          className="bg-[#7209b7] text-white"
          onClick={handleSave}
          // disabled={isSaved}
        >
          Save For Later
            {/* {isSaved ? "Saved" : "Save For Later"} */}
        </Button>
      </div>
    </div>
  );
};

export default Job;
