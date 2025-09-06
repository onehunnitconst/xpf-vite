import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster position="top-center" />
      </QueryClientProvider>
    </>
  );
}

export default App;
