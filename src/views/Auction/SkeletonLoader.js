import { Skeleton } from "@material-ui/lab";
import { Grid, useTheme } from "@material-ui/core";

const SkeletonLoader = () => {
  const theme = useTheme();
  return (
    <Grid container spacing={2} justifyContent="flex-start" style={{ padding: theme.spacing(4) }}>
      <Skeleton width="30%" height="25px" />
      <Skeleton width="100%" height="25px" />
      <Skeleton width="100%" height="25px" />
      <Skeleton width="50%" height="25px" />
    </Grid>
  );
};

export default SkeletonLoader;
