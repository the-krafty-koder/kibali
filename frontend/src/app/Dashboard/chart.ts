export const chartOptions = {
  chart: {
    id: "radial-bar",
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
  labels: ["Used", "Unused"],
};

export const chartSeries = (totalSize: number) => {
  const percentageUsed = Math.round((totalSize / 250) * 100);
  return [percentageUsed];
};
