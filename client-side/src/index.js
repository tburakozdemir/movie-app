import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "react-router-dom";
import App from "./pages/App/App";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserHistory } from "history";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const history = createBrowserHistory();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router history={history}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </QueryClientProvider>,
  document.getElementById("root")
);
