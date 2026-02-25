import React, { useState } from "react";
import Navbar from "../../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    
      setInput({ ...input, companyId: selectedCompany._id });
    
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
        const res = await axios.post(
          // `${JOB_API_END_POINT}/post`,
          `https://jobify-app-g41j.onrender.com/api/v1/job/post`,
           input, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
     toast.error(error.response.data.message);
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-10 px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8 space-y-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Post a New Job
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-1 ml-1">Job Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="e.g., Frontend Developer"
                value={input.title}
               onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="mb-1 ml-1">Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="Brief job overview"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="mb-1 ml-1">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                placeholder="e.g., React, Node.js"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="mb-1 ml-1">Salary</Label>
              <Input
                type="text"
                name="salary"
                placeholder="e.g., ₹6,00,000/year"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="mb-1 ml-1">Location</Label>
              <Input
                type="text"
                name="location"
                placeholder="e.g., Remote or Bengaluru"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="mb-1 ml-1">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                placeholder="e.g., Full-time, Internship"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="mb-1 ml-1">Experience</Label>
              <Input
                type="text"
                name="experience"
                placeholder="e.g., 1-2 years"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="mb-1 ml-1">Number of Positions</Label>
              <Input
                type="number"
                name="position"
                placeholder="e.g., 3"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>

            <div className="md:col-span-2">
              <Label className="mb-1 ml-1">Select Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-red-500 mt-2">
                  * Please register a company first
                </p>
              )}
            </div>
          </div>

          <div>
            {loading ? (
              <Button disabled className="w-full mt-4">
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Posting Job...
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-4 bg-black text-white">
                Post Job
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;



