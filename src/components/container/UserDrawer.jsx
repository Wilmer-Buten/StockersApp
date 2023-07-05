import HomeIcon from '@mui/icons-material/Home';
import { Drawer, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
  
  const data = [
    {
        name: "Home",
        icon: <HomeIcon />,
      },
      {
        name: "Home",
        icon: <HomeIcon />,
      },
  ];
  
  function UserDrawer({open, setOpen}) {
  
    const getList = () => (
      <div style={{ width: 200 }} onClick={() => setOpen(false)}>
        {data.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </div>
    );
    return (
      <div>
      {console.log(open)}
        <Drawer open={open} anchor={"right"} onClose={() => setOpen(false)}>
          {getList()}
        </Drawer>
      </div>
    );
  }
  
  export default UserDrawer;