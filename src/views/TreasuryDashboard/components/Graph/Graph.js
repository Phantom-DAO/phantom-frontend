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
      stopColor={[["#768299", "#98B3E9"]]}
      bulletpointColors={bulletpoints.tvl}
      infoTooltipMessage={tooltipInfoMessages.tvl}
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
      dataKey={["treasuryFraxMarketValue"]}
      stopColor={[
        ["#F5AC37", "#EA9276"],
        ["#768299", "#98B3E9"],
        ["#DC30EB", "#EA98F1"],
        ["#8BFF4D", "#4C8C2A"],
        ["#ff758f", "#c9184a"],
      ]}
      headerText="Market Value of Treasury Assets"
      // headerSubText={`${data && formatCurrency(data[0].treasuryMarketValue)}`}
      headerSubText={`${data && formatCurrency(data[0].treasuryFraxMarketValue)}`}
      bulletpointColors={bulletpoints.coin}
      itemNames={tooltipItems.coin}
      itemType={itemType.dollar}
      infoTooltipMessage={tooltipInfoMessages.mvt}
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
    />
  );
};

export const ProtocolOwnedLiquidityGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });
  const filtered = data && data.filter(metric => metric.treasuryPhmFraxPOL > 50);
  return (
    <Chart
      isPOL
      type="area"
      data={filtered}
      dataFormat="percent"
      itemNames={tooltipItems.pol}
      itemType={itemType.percentage}
      dataKey={["treasuryPhmFraxPOL"]}
      bulletpointColors={bulletpoints.pol}
      infoTooltipMessage={tooltipInfoMessages.pol}
      headerText="Protocol Owned Liquidity PHM-FRAX"
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
      headerSubText={`${filtered && trim(filtered[0].treasuryPhmFraxPOL, 2)}% `}
      stopColor={[["rgba(128, 204, 131, 1)", "rgba(128, 204, 131, 0)"]]}
    />
  );
};

export const PHMStakedGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });
  const staked =
    data &&
    data
      .map(metric => ({
        staked: (metric.sPhmCirculatingSupply / metric.phmCirculatingSupply) * 100,
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
      headerText="PHM Staked"
      stopColor={[["#55EBC7", "#47ACEB"]]}
      bulletpointColors={bulletpoints.staked}
      infoTooltipMessage={tooltipInfoMessages.staked}
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
      headerSubText={`${staked && trim(staked[0].staked, 2)}% `}
    />
  );
};

export const APYOverTimeGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryRebases({ refetchOnMount: false });
  let apy =
    data &&
    data.map(entry => ({
      timestamp: entry.timestamp,
      apy: Math.pow(parseFloat(entry.percentage) + 1, 365 * 3) * 100,
    }));
  // .filter(pm => pm.apy < 300000);

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
      // headerSubText={`${data && trim(apy[0].apy, 2)}%`}
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
    />
  );
};
