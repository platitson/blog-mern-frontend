import { Header } from "./components/Header";
import Container from "@mui/material/Container";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router";
import { Login } from "./pages/Login";
import { FullPost } from "./pages/FullPost";

function App() {
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
