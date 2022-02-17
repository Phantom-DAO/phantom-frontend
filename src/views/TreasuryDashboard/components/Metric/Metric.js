import { useSelector } from "react-redux";
import { Skeleton } from "@material-ui/lab";
import { Typography, Box } from "@material-ui/core";
import { trim, formatCurrency } from "../../../../helpers";
import InfoTooltip from "src/components/InfoTooltip/InfoTooltip.jsx";

export const Metric = props => (
  <Box display="flex" flexDirection="column" gridGap="10px" className={`metric ${props.className}`}>
    {props.children}
  </Box>
);

Metric.Value = props => <Typography variant="h5">{props.children || <Skeleton type="text" />}</Typography>;

Metric.Title = props => (
  <Typography variant="h6" color="textSecondary">
    {props.children}
  </Typography>
);

Metric.Shift = props => (
  <Box display="flex" alignItems="center">
    <Typography variant="p" className="metric-shift">
      {props.children}
    </Typography>
    <Typography variant="p">From previous period</Typography>
  </Box>
);

export const MarketCap = () => {
  const marketCap = useSelector(state => state.app.marketCap);
  return (
    <Metric className="market">
      <Metric.Title>MARKET CAP</Metric.Title>
      <Metric.Value>{marketCap && formatCurrency(marketCap, 0)}</Metric.Value>
      {/* <Metric.Shift>14%</Metric.Shift> */}
    </Metric>
  );
};

export const PHMPrice = () => {
  const marketPrice = useSelector(state => state.app.marketPrice);
  return (
    <Metric className="price">
      <Metric.Title>PHM PRICE</Metric.Title>
      <Metric.Value>{marketPrice && formatCurrency(marketPrice, 2)}</Metric.Value>
      {/* <Metric.Shift>14%</Metric.Shift> */}
    </Metric>
  );
};

export const CircSupply = () => {
  const circSupply = useSelector(state => state.app.circSupply);
  const totalSupply = useSelector(state => state.app.totalSupply);

  const isDataLoaded = circSupply && totalSupply;

  return (
    <Metric className="circ">
      <Metric.Title>CIRCULATING SUPPLY (TOTAL)</Metric.Title>
      <Metric.Value>{isDataLoaded && parseInt(circSupply) + " / " + parseInt(totalSupply)}</Metric.Value>
      {/* <Metric.Shift>14%</Metric.Shift> */}
    </Metric>
  );
};

export const CurrentIndex = () => {
  const currentIndex = useSelector(state => state.app.currentIndex);

  return (
    <Metric className="index">
      <Metric.Title>
        CURRENT INDEX
        <InfoTooltip message="The current index tracks the amount of sPHM accumulated since the beginning of staking. Basically, how much sPHM one would have if they staked and held a single PHM from day 1." />
      </Metric.Title>
      <Metric.Value>{currentIndex && trim(currentIndex, 2) + " sPHM"}</Metric.Value>
      {/* <Metric.Shift>14%</Metric.Shift> */}
    </Metric>
  );
};
