export const chartOptions = {
  chart: {
    id: "radial-bar",
    fontFamily: "Outfit",
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      track: {
        background: ["#f7f5fa"],
        startAngle: -135,
        endAngle: 135,
      },
      hollow: {
        margin: 15,
        size: "70%",
      },
      dataLabels: {
        name: {
          fontFamily: "Outfit",
          color: "rgba(0,0,0,0.6)",
        },
        value: {
          fontSize: "30px",
          show: true,
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      gradientToColors: ["#CEAEFE"],
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "round" as "round" | "square" | "butt" | undefined,
  },
  labels: ["You've used up"],
};

export const chartSeries = (totalSize: number) => {
  const percentageUsed = Math.round((totalSize / 50) * 100);
  return [percentageUsed === 0 ? 1 : percentageUsed];
};
