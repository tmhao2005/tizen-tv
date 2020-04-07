import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from "./App";

// M<ock
if (!global.tizen) {
  global.tizen = {
    TZDate: class {
      public toTimeString = () => new Date().toString();
    },
  } as Tizen;
}

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
