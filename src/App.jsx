import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

import AppLayout from "./ui/AppLayout";
import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import Bookmarks from "./pages/Bookmarks";
import PageNotFound from "./pages/PageNotFound";

import GlobaStyles from "./styles/GlobalStyles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <GlobaStyles />

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Homepage />} />
              <Route path="products" element={<Products />} />
              <Route path="product/:productPermalink" element={<Product />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order/:orderId" element={<Order />} />
              <Route path="bookmarks" element={<Bookmarks />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster position="top-center" richColors visibleToasts={4} />
      </QueryClientProvider>
    </>
  );
}

export default App;
