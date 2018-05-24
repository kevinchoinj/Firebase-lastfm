import React from 'react';

import MenuPanel from './MenuPanel';
import MenuButton from './MenuButton';
import MenuText from './MenuText';

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