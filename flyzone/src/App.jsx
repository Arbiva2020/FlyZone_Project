import "./App.css";
import Router from "./Router/Router";
import {Provider} from 'react-redux';
import {store} from './store/store.js';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div>
          <Router />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
