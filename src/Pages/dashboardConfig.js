/* eslint-disable no-unused-vars */
import {
  FaHome,
  FaChartBar,
  FaUsers,
  FaCog,
  FaWallet,
  FaSignOutAlt,
  FaHandsHelping,
  FaLink,
  FaBoxOpen,
} from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
// import { BsPeopleFill } from "react-icons/bs";
// import { HiOutlineCash } from "react-icons/hi";
// import logo from "../assets/oneapp.png";

export const dashboardConfig = {
  logo: {
    title: "Tradescribe",
  },
  generalItems: [
    { label: "Dashboard", icon: FaHome, path: "/dashboard", sublabels: [] },

    {
      label: "Admin Access",
      icon: RiAdminFill,
      path: "/dashboard/admin-access",
      sublabels: [],
    },

    { label: "Users", icon: FaUsers, path: "/dashboard/users", sublabels: [] },

    {
      label: "Help",
      icon: FaHandsHelping,
      path: "/dashboard/help",
      sublabels: [],
    },
    {
      label: "Logout",
      icon: FaSignOutAlt,
      path: "/dashboard/logout",
      sublabels: [],
    },

  
  ],

};
