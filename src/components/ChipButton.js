import React from 'react';

import ContentAdd from 'material-ui/svg-icons/content/add-circle';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const ChipButton = (props) => (
  <FloatingActionButton
    {...props}
    backgroundColor="#e0e0e0"
    iconStyle={{
      fill: 'rgba(0, 0, 0, 0.26)',
      height: '32px',
      width: '32px',
    }}
    zDepth={0}
  />
);

export const AddChipButton = (props) => (
  <ChipButton
    {...props}
  >
    <ContentAdd
      style={{
        height: '24px',
        margin: '4px',
        width: '24px',
      }}
    />
  </ChipButton>
);
