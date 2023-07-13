import React from 'react';
import AppBarComponent from '../components/container/AppBarComponent';
import ItemsConfigContainer from '../components/container/ItemsConfigContainer';

function ConfigPage() {
  return (
   <AppBarComponent prop={<ItemsConfigContainer/>}></AppBarComponent>
  );
}

export default ConfigPage;
