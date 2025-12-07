import React from 'react';
import AIChatbot from '@site/src/components/AIChatbot';

export default function Root({children}) {
  return (
    <>
      {children}
      <AIChatbot />
    </>
  );
}