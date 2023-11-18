import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Box, Grid, Typography, useTheme } from "@mui/material";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import dynamic from "next/dynamic";

const useStyles = makeStyles((theme) => ({
  background: {
    // backgroundImage: 'url("images/network.png")',
    backgroundPosition: "center center,center center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "cover,contain",
    height: "100%",
    width: "100%",
    paddingTop: "2%",
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingTop: "10%",
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
  pageTitle: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "left",
  },

  pageSubtitle: {
    color: "#bdbdbd",
    textAlign: "left",
  },
}));

export default function LineChart({ xaxis, yaxis, yaxisMax, selectedToken }) {
  const classes = useStyles();
  const theme = useTheme();

  let chartData = {
    series: [
      {
        name: "Price",
        data: xaxis,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["rgba(130, 71, 229, 0.7)", "rgba(130, 71, 229, 0.3)"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },

      grid: {
        borderColor: "#212121",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.04,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: yaxis,
        title: {
          text: `Expected tokens received after order execution ($${selectedToken.name})`,
          style: {
            color: "#f9f9f9",
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 500,
            cssClass: "apexcharts-xaxis-title",
          },
        },
        style: {
          colors: [],
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },

        tickAmount: undefined,
        tickPlacement: "between",
        min: undefined,
        max: undefined,
        labels: {
          show: true,
          style: {
            colors: "#f9f9f9",
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-xaxis-label",
          },
        },
      },
      yaxis: {
        title: {
          text: "Price ($)",
          style: {
            color: "#f9f9f9",
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            cssClass: "apexcharts-xaxis-title",
          },
        },

        labels: {
          show: true,
          style: {
            colors: "#f9f9f9",
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-xaxis-label",
          },
        },
        min: 0,
        max: yaxisMax,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  };

  return (
    <div id="chart">
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
}
