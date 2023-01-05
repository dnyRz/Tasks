import React from 'react';
import { SpeedDial } from '@rneui/themed';

export default ({ actionOne, actionTwo }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <SpeedDial
      isOpen={open}
      icon={{ name: 'edit', color: '#fff' }}
      openIcon={{ name: 'close', color: '#fff' }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
    >
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title="Add"
        onPress={() => {
          setOpen(!open)
          actionOne()
        }}
      />
      <SpeedDial.Action
        icon={{ name: 'check', color: '#fff' }}
        title="Complete"
        onPress={actionTwo}
      />
    </SpeedDial>
  );
};