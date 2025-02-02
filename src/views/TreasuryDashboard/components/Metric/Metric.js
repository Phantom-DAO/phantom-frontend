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
      <Metric.Shift>14%</Metric.Shift>
    </Metric>
  );
};

export const OHMPrice = () => {
  const marketPrice = useSelector(state => state.app.marketPrice);

  return (
    <Metric className="price">
      <Metric.Title>PHM PRICE</Metric.Title>
      <Metric.Value>{marketPrice && formatCurrency(marketPrice, 2)}</Metric.Value>
      <Metric.Shift>14%</Metric.Shift>
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
      <Metric.Shift>14%</Metric.Shift>
    </Metric>
  );
};

export const BackingPerOHM = () => {
  const backingPerOhm = useSelector(state => state.app.treasuryMarketValue / state.app.circSupply);

  return (
    <Metric className="bpo">
      <Metric.Title>BACKING PER PHM</Metric.Title>
      <Metric.Value>{!isNaN(backingPerOhm) && formatCurrency(backingPerOhm, 2)}</Metric.Value>
      <Metric.Shift>14%</Metric.Shift>
    </Metric>
  );
};

export const CurrentIndex = () => {
  const currentIndex = useSelector(state => state.app.currentIndex);

  return (
    <Metric className="index">
      <Metric.Title>
        CURRENT INDEX
        <InfoTooltip message="The current index tracks the amount of sOHM accumulated since the beginning of staking. Basically, how much sOHM one would have if they staked and held a single OHM from day 1." />
      </Metric.Title>
      <Metric.Value>{currentIndex && trim(currentIndex, 2) + " sOHM"}</Metric.Value>
      <Metric.Shift>14%</Metric.Shift>
    </Metric>
  );
};

export const WSOHMPrice = () => {
  const wsOhmPrice = useSelector(state => state.app.marketPrice * state.app.currentIndex);

  return (
    <Metric className="wsoprice">
      <Metric.Title>
        wsPHM PRICE
        <InfoTooltip
          message={
            "wsOHM = sOHM * index\n\nThe price of wsOHM is equal to the price of OHM multiplied by the current index"
          }
        />
      </Metric.Title>
      <Metric.Value>{wsOhmPrice && formatCurrency(wsOhmPrice, 2)}</Metric.Value>
      <Metric.Shift>14%</Metric.Shift>
    </Metric>
  );
};
