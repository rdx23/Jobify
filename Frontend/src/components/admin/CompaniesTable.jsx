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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(
      (store) => store.company
    );
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(() => {
      const filteredCompany =
        companies.length >= 0 &&
        companies.filter((company) => {
          if (!searchCompanyByText) {
            return true;
          }
          return company?.name
            ?.toLowerCase()
            .includes(searchCompanyByText.toLowerCase());
        });
      setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Registered Companies
      </h1>
      <Table>
        <TableCaption className="text-sm text-gray-500 italic">
          A list of your recently registered companies.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-gray-700 font-semibold">Logo</TableHead>
            <TableHead className="text-gray-700 font-semibold">Name</TableHead>
            <TableHead className="text-gray-700 font-semibold">Date</TableHead>
            <TableHead className="text-right text-gray-700 font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow
              key={company._id}
              className="hover:bg-gray-50 transition-all duration-200 group"
            >
              <TableCell>
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={company.logo || "https://via.placeholder.com/40"}
                    alt={company.name}
                    className="rounded-full object-cover"
                  />
                </Avatar>
              </TableCell>
              <TableCell className="text-gray-800 font-medium">
                {company.name}
              </TableCell>
              <TableCell className="text-gray-600 text-sm">
                {company.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-2 rounded-md hover:bg-gray-200">
                      <MoreHorizontal className="h-5 w-5 text-gray-700" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-36">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Edit</span>
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

export default CompaniesTable;
