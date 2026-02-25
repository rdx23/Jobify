import React, { useEffect, useState } from "react";
import Navbar from "../../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import axios from "axios";
import { motion } from "framer-motion";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        // `${COMPANY_API_END_POINT}/update/${params.id}`,
        `https://jobify-app-g41j.onrender.com/api/v1/company/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mt-12 bg-white shadow-lg rounded-xl p-8"
      >
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Button>
          <h1 className="text-2xl font-bold">Company Setup</h1>
        </motion.div>

        <motion.form
          onSubmit={submitHandler}
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {["name", "description", "website", "location"].map(
              (field, index) => (
                <motion.div
                  key={field}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Label className="mb-1 ml-1 capitalize">{field}</Label>
                  <Input
                    type="text"
                    name={field}
                    value={input[field]}
                    onChange={changeEventHandler}
                    placeholder={`Eg: ${
                      field === "name" ? "Microsoft" : field
                    }`}
                  />
                </motion.div>
              )
            )}

            {/* File input */}
            <motion.div
              className="sm:col-span-2"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Label className="mb-1 ml-1">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </motion.div>
          </div>

          {/* Submit button */}
          <motion.div
            className="pt-4"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            {loading ? (
              <Button disabled className="w-full">
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Updating...
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-black">
                Save Changes
              </Button>
            )}
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default CompanySetup;
