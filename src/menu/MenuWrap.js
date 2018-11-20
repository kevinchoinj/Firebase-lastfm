import React from 'react';

import MenuPanel from 'menu/MenuPanel';
import MenuButton from 'menu/MenuButton';
import MenuText from 'menu/MenuText';

class Menuwrap extends React.Component{
  render(){
    return(
      <div>
        <MenuPanel/>
        <MenuButton/>
        <MenuText/>
      </div>
    )
  }
}

export default Menuwrap;