import { Header } from "./components/Header";
import Container from "@mui/material/Container";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router";
import { Login } from "./pages/Login";
import { FullPost } from "./pages/FullPost";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./redux/store";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ margin: "1.6rem auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
