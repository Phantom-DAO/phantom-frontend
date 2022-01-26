import { makeStyles } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import NavContent from "./NavContent.jsx";
import "./sidebar.scss";

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    boxShadow: "0px 0px 64px rgba(119, 34, 252, 0.1) !important",
  },
}));

function Sidebar() {
  const classes = useStyles();

  return (
    <div className={`sidebar`} id="sidebarContent">
      <Drawer
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <NavContent />
      </Drawer>
    </div>
  );
}

export default Sidebar;
