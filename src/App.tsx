import { Header } from "./components/Header";
import Container from "@mui/material/Container";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ margin: "0.8rem auto" }}>
        <Home />
      </Container>
    </>
  );
}

export default App;
