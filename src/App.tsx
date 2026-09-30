import { Header } from "./components/Header";
import Container from "@mui/material/Container";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ margin: "0.8rem auto" }}>
        Hello Blog
      </Container>
    </>
  );
}

export default App;
