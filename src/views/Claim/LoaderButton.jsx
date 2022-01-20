import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Box} from "@material-ui/core"


function LoaderButton() {
    return (

    <Box className="loaderButton" sx={{display:"flex",flexDirection: "row"}}>
        <div className="progress">
        <CircularProgress size={22} color="#FFC768" />
        </div>
        <p style={{
            marginTop: 12,
            marginBottom: 12
        }}> Pending</p>
    </Box>
    );

}

export default LoaderButton;