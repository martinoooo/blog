import * as React from 'react';
import { createRoot } from 'react-dom/client';

export const Hello = () => (
  <>
    <h1 style={{ textAlign: 'center' }}>👷‍♀️ 施工中 👷</h1>
    <h4 style={{ textAlign: 'center' }}>请清空local storage回到原先的ui</h4>
  </>
);

const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(<Hello />);
