import "./App.css";
import Router from "./Router/Router";
import {Provider} from 'react-redux';
import {store} from './store/store.js';
import api from './api.js';

function App() {

  return (
      <Provider store={store}>
        <div>
          <Router />
        </div>
      </Provider>
  );
}

export default App;
