import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuIcon from '@material-ui/icons/Menu';



export default function DrawerComponent(props) {
  const anchor = 'left'; //lado pelo qual a drawer irá vir
  
  const [side, setSide] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSide({ ...side, [anchor]: open });
  };

  const list = (
    <div>
      <List style={{width:'150px'}}   >
      <ListItem button key ='Início'><ListItemText primary='Início'/></ListItem> 
        {['Jogos', 'Mangá', 'Animes', 'Filmes', 'Séries'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text}> adasdas </ListItemText>
            <ArrowDropDownIcon />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <div>
      <MenuIcon onClick={toggleDrawer(anchor, true)} id='drawer'  style={{fontSize: props.props}} />
          <Drawer anchor={anchor} open={side[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list}
          </Drawer>
    </div>
  );
}
