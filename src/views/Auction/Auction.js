import { Paper, Zoom } from "@material-ui/core";
import { useState } from "react";
import "./auction.scss";

const Auction = () => {
  const [zoomed, setZoomed] = useState(false);
  return (
    <div id="auction-view">
      <Zoom in={true} onEntered={() => setZoomed(true)}>
        <Paper className={`ohm-card`}>Auction Page</Paper>
      </Zoom>
    </div>
  );
};

export default Auction;
