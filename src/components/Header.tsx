import { Button, Container, AppBar } from "@mui/material";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import { styled } from "@mui/material/styles";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { isAuthSelector, logout } from "../redux/slices/auth";
import type { AppDispatch } from "../redux/store";

export const Header = () => {
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch<AppDispatch>();

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <StyledAppBar position="sticky">
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <StyledLogoLink to="/">
          <BubbleChartOutlinedIcon />
          ARTicle
        </StyledLogoLink>
        <div>
          {isAuth ? (
            <>
              <Button
                component={Link}
                to="/create"
                variant="contained"
                sx={{ marginRight: "0.8rem" }}
              >
                Write Article
              </Button>
              <Button variant="outlined" onClick={onClickLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{ marginRight: "0.8rem" }}
              >
                Login
              </Button>
              <Button component={Link} to="/register" variant="contained">
                Register
              </Button>
            </>
          )}
        </div>
      </Container>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "0.8rem 0",
}));

const StyledLogoLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: "flex",
  gap: "0.4rem",
  textDecoration: "none",
  fontWeight: 400,
}));
