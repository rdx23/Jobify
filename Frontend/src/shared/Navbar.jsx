import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";
import jobSearchImg from "./jobSearch.png";


const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <motion.div
      className="sticky top-0 z-50 bg-gradient-to-r from-white/70 via-white/60 to-white/70 backdrop-blur-sm border-b border-gray-200 shadow-sm"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mx-auto max-w-6xl px-6 sm:px-10 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center ">
          <img
            src={jobSearchImg}
            alt="Logo"
            loading="lazy"
            className="h-10 w-auto object-contain cursor-pointer"
          />
          <h1 className="text-2xl font-bold cursor-pointer tracking-wide text-gray-900">
            Job<span className="text-[#F83002]">ify</span>
          </h1>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-4">
          <ul className="hidden sm:flex font-medium text-gray-800 items-center gap-6">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-[#6A38C2]">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-[#6A38C2]">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-[#6A38C2]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-[#6A38C2]">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-[#6A38C2]">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Buttons / Profile */}
          {!user ? (
            <div className="flex items-center gap-4 ml-4">
              <Link to="/login">
                <Button variant="outline" className="rounded-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-full bg-[#06000c] hover:bg-[#424242] text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ml-4">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="Profile"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 shadow-xl">
                <div className="flex gap-3 items-center mb-4">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-gray-600">
                  {user.role === "student" && (
                    <div className="flex items-center gap-2">
                      <User2 className="w-4 h-4" />
                      <Link to="/profile">
                        <Button variant="link" className="p-0 h-auto">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="p-0 h-auto"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
