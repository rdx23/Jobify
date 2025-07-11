import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          .toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Posted Jobs</h1>
      <Table>
        <TableCaption className="text-sm text-gray-500 italic">
          A list of your recently posted jobs.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-gray-700 font-semibold">
              Company
            </TableHead>
            <TableHead className="text-gray-700 font-semibold">Role</TableHead>
            <TableHead className="text-gray-700 font-semibold">
              Posted On
            </TableHead>
            <TableHead className="text-right text-gray-700 font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow
              key={job._id}
              className="hover:bg-gray-50 transition-all duration-150"
            >
              <TableCell className="text-gray-800">
                {job?.company?.name}
              </TableCell>
              <TableCell className="text-gray-800 font-medium">
                {job?.title}
              </TableCell>
              <TableCell className="text-gray-600 text-sm">
                {job?.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-2 hover:bg-gray-200 rounded-md">
                      <MoreHorizontal className="w-5 h-5 text-gray-700" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-2 space-y-2">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Edit Job</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">View Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
