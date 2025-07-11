import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { useSelector } from "react-redux";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { motion } from "framer-motion";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-md"
      >
        <div className="flex justify-between items-start">
          {/* Profile Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 shadow-sm">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-semibold text-2xl">{user?.fullname}</h1>
              <p className="text-gray-600">
                {user?.profile?.bio || "No bio added."}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            onClick={() => setOpen(true)}
            className="rounded-full"
            variant="outline"
            title="Edit Profile"
          >
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        {/* Contact Details */}
        <div className="my-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-4 h-4" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="w-4 h-4" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6">
          <h2 className="text-md font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, idx) => (
                <Badge key={idx} className="text-sm">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="my-4">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume ? (
            <div className="mt-1">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user?.profile?.resume}
                className="text-blue-600 hover:underline text-sm"
              >
                {user?.profile?.resumeOriginalName || "View Resume"}
              </a>
            </div>
          ) : (
            <p className="text-gray-500 text-sm mt-1">NA</p>
          )}
        </div>
      </motion.div>

      {/* Applied Jobs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl px-6 py-8 shadow-md"
      >
        <h1 className="font-bold text-xl mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </motion.div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
