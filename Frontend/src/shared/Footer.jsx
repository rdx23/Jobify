import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gray-100 text-gray-700 pt-10 mt-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-extrabold text-black cursor-pointer">
              Job<span className="text-[#F83002]">ify</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Your trusted job portal helping thousands find their dream jobs.
              Browse, apply, and get hired faster than ever.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#6A38C2] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-[#6A38C2] transition">
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/companies"
                  className="hover:text-[#6A38C2] transition"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#6A38C2] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-5">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1877f2] transition transform hover:scale-110"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326V22.67C0 23.407.593 24 1.325 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.788 4.657-4.788 1.325 0 2.463.1 2.794.144v3.239h-1.918c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.407 24 22.675V1.326C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1DA1F2] transition transform hover:scale-110"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.868 9.868 0 01-3.127 1.195 4.922 4.922 0 00-8.384 4.482A13.978 13.978 0 011.671 3.149 4.921 4.921 0 003.195 9.72a4.903 4.903 0 01-2.229-.616v.062a4.923 4.923 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.923 4.923 0 004.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.058 0 14.01-7.507 14.01-14.01 0-.213-.005-.426-.014-.637A10.025 10.025 0 0024 4.557z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0077b5] transition transform hover:scale-110"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.598v-5.569c0-1.327-.028-3.037-1.854-3.037-1.853 0-2.137 1.447-2.137 2.94v5.666H9.146V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.635 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.104 0-2-.896-2-2s.896-2 2-2c1.105 0 2 .895 2 2s-.895 2-2 2zm1.782 12.162H3.554V9.756h3.565v10.696zM22.225 0H1.771C.791 0 0 .775 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.205 24 24 23.225 24 22.271V1.729C24 .775 23.205 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center py-4 text-sm text-gray-500 border-t border-gray-200 mt-6">
          © 2025 Jobify. All rights reserved. Developed by{" "}
          <span className="font-semibold text-gray-700">Rahul Dora</span>.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
