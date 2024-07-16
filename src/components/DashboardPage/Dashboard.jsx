import React, { useEffect, useState } from "react";

import useAuth from "../../hooks/useAuth";

import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { HiOutlineUserGroup } from "react-icons/hi2";

import { PiWarningCircle } from "react-icons/pi";
import useData from "../../hooks/useData";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


import "react-calendar/dist/Calendar.css";

import { RiUserAddLine } from "react-icons/ri";


import { FaListOl } from "react-icons/fa6";


const percentFormat = (count, total) => {
  if (typeof count == "number" && typeof total == "number") {
    const percent = (count / total) * 100;
    return `${percent.toFixed(0)}%`;
  } else {
    return "  ";
  }
};

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const {
    availableMTOP,
    availableMTOPLoading,
    franchises,
    franchisesLoading,
    headerShadow,
    setHeaderShadow,
    violations,
    franchiseAnalytics,
    violationAnalytics,
  } = useData();

  const [selectedBtn, setSelectedBtn] = useState("daily");

  useEffect(() => {
    document.title = "Dashboard | LAND TAX MANAGEMENT SYSTEM";
    window.scrollTo(0, 0);

    return () => {
      setHeaderShadow(false);
    };
  }, []);

  const cardData = [
    {
      title: "Registered Clients",
      data: franchisesLoading ? (
        <Typography
          component={"div"}
          display="flex"
          alignItems="center"
          gap={2}
        >
          <CircularProgress size={18} color="secondary" />
          loading...
        </Typography>
      ) : (
        franchises.length
      ),
      icon: <HiOutlineUserGroup color={"#FFF"} size={18} />,
      subText: "Registered Franchises in San Pablo City",
    },
    {
      title: "Available Franchises",
      data: availableMTOP?.length || 0,
      icon: <FaListOl color={"#1A237E"} sx={{ color: "#1A237E" }} size={16} />,
      subText: "Total count of available MTOP",
    },
    {
      title: "Recently Added",
      data: franchiseAnalytics?.recentlyAdded || 0,
      icon: <RiUserAddLine color={"#1A237E"} size={18} />,
      subText: "clients that have been added recently",
    },

    {
      title: "Recently Revoked",
      data: franchiseAnalytics?.recentlyRevoked || 0,
      icon: <PiWarningCircle color={"#1A237E"} size={20} />,
      subText: "total count of clients revoked",
    },
  ];

  const handleBarchartClick = (btnName) => {
    setSelectedBtn(btnName);
  };

  return (
    <Box //main contianer scrollable
      height="100vh"
      maxHeight="90vh"
      sx={{
        overflowY: "scroll",
        overflowX: "hidden",
        backgroundColor: "#EEF2F6",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxSizing: "border-box",
      }}
      width="100%"
      onScroll={(e) => {
        if (e.target.scrollTop > 0 && !headerShadow) setHeaderShadow(true);
        if (e.target.scrollTop == 0 && headerShadow) setHeaderShadow(false);
      }}
    >
     
    </Box>
  );
};

export default Dashboard;
