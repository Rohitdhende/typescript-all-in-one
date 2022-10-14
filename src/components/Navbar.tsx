import "./css/Navbar.css";
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Fab from "@mui/material/Fab";

type NavbarProps = {
  activeTab: string;
  activeTabFun(activeTab: string): void;
};

export const Navbar = ({ activeTab, activeTabFun }: NavbarProps) => {
  const handleClick = (activeTab: string) => {
    activeTabFun(activeTab);
  };
  const [isNavbarOpen, setNavbarOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setNavbarOpen(open);
  };

  const list = (anchor: string) => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List
        sx={{
          display: { lg: "flex", md: "flex" },
          justifyContent: "space-between",
        }}
      >
        {["TodoList", "Project2", "Project3", "Project4"].map((text, index) => (
          <ListItem
            className={activeTab === text ? "active" : ""}
            key={text}
            disablePadding
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ListItemButton
              onClick={() => {
                handleClick(text);
              }}
            >
              <ListItemIcon >
                {index % 2 === 0 ? <InboxIcon className={activeTab === text ? "active" : ""}/> : <MailIcon className={activeTab === text ? "active" : ""}/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div className="navbar-parent">
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "absolute",
          bottom: "1rem",
          left: "1rem",
        }}
      >
        <Fab color="success" aria-label="add" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Fab>
      </Box>

      <React.Fragment>
        <SwipeableDrawer
          anchor={"bottom"}
          open={isNavbarOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list("bottom")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
