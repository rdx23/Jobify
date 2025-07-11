import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-20">
        {/* Tagline */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium"
        >
          India’s Leading Job Search Platform
        </motion.span>

        {/* Heading */}
        <motion.h1
          className="text-5xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-gray-600 text-lg max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Discover thousands of job opportunities from top companies, tailored
          just for you. Start your career journey today!
        </motion.p>
        <motion.div
          className="flex w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] items-center mx-auto bg-white border border-gray-200 shadow-lg rounded-full overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow h-12 px-4 text-sm sm:text-base outline-none bg-transparent"
          />
          <motion.div whileTap={{ scale: 0.95 }} className="h-full">
            <Button
              onClick={searchJobHandler}
              className="h-12 px-4 bg-[#6A38C2] text-white rounded-none rounded-r-full"
            >
              <Search className="w-7 h-7" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import { Search } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { setSearchedQuery } from "@/redux/jobSlice";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const HeroSection = () => {
//   const [query, setQuery] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const searchJobHandler = () => {
//     dispatch(setSearchedQuery(query));
//     navigate("/browse");
//   };

//   return (
//     <div className="text-center">
//       <div className="flex flex-col gap-5 my-20">
//         {/* Tagline */}
//         <motion.span
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium"
//         >
//           No. 1 Job Hunt Website
//         </motion.span>

//         {/* Heading */}
//         <motion.h1
//           className="text-5xl font-bold"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//         >
//           Search, Apply & <br /> Get Your{" "}
//           <span className="text-[#6A38C2]">Dream Jobs</span>
//         </motion.h1>

//         {/* Subtext */}
//         <motion.p
//           className="text-gray-600 text-lg max-w-xl mx-auto"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.6 }}
//         >
//           Discover thousands of job opportunities from top companies, tailored
//           just for you. Start your career journey today!
//         </motion.p>

//         {/* Search Bar */}
//         <motion.div
//           className="flex w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8, duration: 0.6 }}
//         >
//           <input
//             type="text"
//             placeholder="Find your dream jobs"
//             onChange={(e) => setQuery(e.target.value)}
//             className="outline-none border-none w-full bg-transparent py-3 px-2 text-sm sm:text-base"
//           />
//           <motion.div whileTap={{ scale: 0.9 }}>
//             <Button
//               onClick={searchJobHandler}
//               className="rounded-r-full bg-[#6A38C2] cursor-pointer"
//             >
//               <Search className="h-5 w-5" />
//             </Button>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
