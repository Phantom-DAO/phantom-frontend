import Chart from "src/components/Chart/Chart.jsx";
import { useTheme } from "@material-ui/core/styles";
import { trim, formatCurrency } from "../../../../helpers";
import { useTreasuryMetrics } from "../../hooks/useTreasuryMetrics";
import { useTreasuryRebases } from "../../hooks/useTreasuryRebases";
import { bulletpoints, tooltipItems, tooltipInfoMessages, itemType } from "../../treasuryData.js";

export const Graph = ({ children }) => <>{children}</>;

export const TotalValueDepositedGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });
  return (
    <Chart
      type="area"
      data={data}
      itemType={itemType.dollar}
      itemNames={tooltipItems.tvl}
      dataKey={["totalValueLocked"]}
      headerText="Total Value Deposited"
      stopColor={[theme.palette.purpleChart]}
      bulletpointColors={bulletpoints.tvl}
      infoTooltipMessage={tooltipInfoMessages.tvl}
      strokeDasharray="6 6"
      strokeDirection="horizontal"
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
      headerSubText={`${data && formatCurrency(data[0].totalValueLocked)}`}
    />
  );
};

export const MarketValueGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });

  return (
    <Chart
      type="stack"
      data={data}
      dataKey={[
        "treasuryDaiMarketValue",
        "treasuryFraxMarketValue",
        "treasuryWETHMarketValue",
        "treasuryXsushiMarketValue",
        "treasuryLusdMarketValue",
      ]}
      stopColor={[
        theme.palette.purpleChart,
        theme.palette.yellowChart,
        theme.palette.greenChart,
        ["#8BFF4D", "#4C8C2A"],
        ["#ff758f", "#c9184a"],
      ]}
      headerText="Market Value of Treasury Assets"
      headerSubText={`${data && formatCurrency(data[0].treasuryMarketValue)}`}
      bulletpointColors={bulletpoints.coin}
      itemNames={tooltipItems.coin}
      itemType={itemType.dollar}
      infoTooltipMessage={tooltipInfoMessages.mvt}
      strokeDasharray="6 6"
      strokeDirection="horizontal"
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
    />
  );
};

export const RiskFreeValueGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });

  return (
    <Chart
      type="stack"
      data={data}
      format="currency"
      dataKey={["treasuryDaiRiskFreeValue", "treasuryFraxRiskFreeValue", "treasuryLusdRiskFreeValue"]}
      stopColor={[
        theme.palette.purpleChart,
        theme.palette.yellowChart,
        theme.palette.greenChart,
        ["#000", "#fff"],
        ["#000", "#fff"],
      ]}
      headerText="Risk Free Value of Treasury Assets"
      headerSubText={`${data && formatCurrency(data[0].treasuryRiskFreeValue)}`}
      bulletpointColors={bulletpoints.rfv}
      itemNames={tooltipItems.rfv}
      itemType={itemType.dollar}
      infoTooltipMessage={tooltipInfoMessages.rfv}
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
      strokeDasharray="6 6"
      strokeDirection="horizontal"
    />
  );
};

export const ProtocolOwnedLiquidityGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });

  return (
    <Chart
      isPOL
      type="area"
      data={data}
      dataFormat="percent"
      itemNames={tooltipItems.pol}
      itemType={itemType.percentage}
      dataKey={["treasuryOhmDaiPOL"]}
      bulletpointColors={bulletpoints.pol}
      infoTooltipMessage={tooltipInfoMessages.pol}
      headerText="Protocol Owned Liquidity PHM-DAI"
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
      headerSubText={`${data && trim(data[0].treasuryOhmDaiPOL, 2)}% `}
      stopColor={[theme.palette.lightBlueChart]}
      strokeDasharray="6 6"
      strokeDirection="vertical"
    />
  );
};

export const OHMStakedGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });

  const staked =
    data &&
    data
      .map(metric => ({
        staked: (metric.sOhmCirculatingSupply / metric.ohmCirculatingSupply) * 100,
        timestamp: metric.timestamp,
      }))
      .filter(metric => metric.staked < 100);

  return (
    <Chart
      isStaked
      type="area"
      data={staked}
      dataKey={["staked"]}
      dataFormat="percent"
      headerText="OHM Staked"
      stopColor={[theme.palette.orangeChart]}
      bulletpointColors={bulletpoints.staked}
      infoTooltipMessage={tooltipInfoMessages.staked}
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
      headerSubText={`${staked && trim(staked[0].staked, 2)}% `}
      strokeDasharray="6 6"
      strokeDirection="vertical"
    />
  );
};

export const APYOverTimeGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryRebases({ refetchOnMount: false });

  let apy =
    data &&
    data
      .map(entry => ({
        timestamp: entry.timestamp,
        apy: Math.pow(parseFloat(entry.percentage) + 1, 365 * 3) * 100,
      }))
      .filter(pm => pm.apy < 300000);

  return (
    <Chart
      type="line"
      scale="log"
      data={apy}
      dataKey={["apy"]}
      dataFormat="percent"
      headerText="APY over time"
      itemNames={tooltipItems.apy}
      itemType={itemType.percentage}
      color={theme.palette.text.primary}
      bulletpointColors={bulletpoints.apy}
      stroke={[theme.palette.text.primary]}
      infoTooltipMessage={tooltipInfoMessages.apy}
      headerSubText={`${data && trim(apy[0].apy, 2)}%`}
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
      strokeDasharray="6 6"
      strokeDirection="vertical"
    />
  );
};

export const RunwayAvailableGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });

  const runway = data && data.filter(metric => metric.runway10k > 5);

  const [current, ...others] = bulletpoints.runway;
  const runwayBulletpoints = [{ ...current, background: theme.palette.text.primary }, ...others];
  const colors = runwayBulletpoints.map(b => b.background);

  return (
    <Chart
      type="multi"
      data={runway}
      dataKey={["runwayCurrent", "runway7dot5k", "runway5k", "runway2dot5k"]}
      color={theme.palette.text.primary}
      stroke={colors}
      headerText="Runway Available"
      headerSubText={`${data && trim(data[0].runwayCurrent, 1)}`}
      dataFormat="days"
      bulletpointColors={runwayBulletpoints}
      itemNames={tooltipItems.runway}
      itemType={""}
      infoTooltipMessage={tooltipInfoMessages.runway}
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
      strokeDasharray="6 6"
      strokeDirection="vertical"
    />
  );
};
