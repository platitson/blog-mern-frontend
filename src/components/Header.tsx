import { Button, Container, AppBar } from "@mui/material";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import { styled } from "@mui/material/styles";

export const Header = () => {
  return (
    <StyledAppBar position="sticky">
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <StyledLogoLink href="/">
          <BubbleChartOutlinedIcon />
          ARTicle
        </StyledLogoLink>
        <div>
          <Button variant="outlined" sx={{ marginRight: "0.8rem" }}>
            Login
          </Button>
          <Button variant="contained">Register</Button>
        </div>
      </Container>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "0.8rem 0",
}));

const StyledLogoLink = styled("a")(({ theme }) => ({
  color: theme.palette.primary.main,
  display: "flex",
  gap: "0.4rem",
  textDecoration: "none",
  fontWeight: 400,
}));
