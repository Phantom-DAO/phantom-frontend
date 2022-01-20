import { Box, Typography } from "@material-ui/core";
import { LineChart, Line, XAxis, YAxis, Tooltip, Label, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box>
        <Box className="item" display="flex">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              AUCTION PRICE
            </Typography>
          </Box>
        </Box>
        <Box>{payload?.[0]?.["value"] + " FRAX"}</Box>
      </Box>
    );
  }

  return null;
};

const LineChartAuction = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          bottom: 10,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis tick={false} domain={[0, "dataMax + 3000"]}>
          <Label value="STARTING PRICE" position="insideTopLeft" offset={70} style={{ fill: "#768299" }} />
          <Label value={`${data[0]["AUCTION PRICE"]}`} position="insideTopLeft" offset={90} style={{ fill: "white" }} />
        </YAxis>
        <YAxis yAxisId="right" orientation="right" tick={false} axisLine={true}>
          <Label value="RESERVE PRICE" position="insideTopRight" offset={70} style={{ fill: "#768299" }} />
          <Label value="10 FRAX" position="insideTopRight" offset={90} style={{ fill: "white" }} />
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="AUCTION PRICE" stroke="#7722FC" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartAuction;
