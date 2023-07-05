import { Drawer, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import WavingHandIcon from '@mui/icons-material/WavingHand';  
  function UserDrawer({open, setOpen, userName}) {
  
    const data = [
      {
          name: " ",
        },
        {
          name: " ",
        },
        {
          name: " ",
        },
        {
          icon: <WavingHandIcon />,
          name: `Hola ${userName}!` ,
        },
    ];

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
        <Drawer open={open} anchor={"right"} onClose={() => setOpen(false)}>
          {getList()}
        </Drawer>
      </div>
    );
  }
  
  export default UserDrawer;