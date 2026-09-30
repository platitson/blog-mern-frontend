import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../redux/slices/posts.ts";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { PostCard } from "../components/PostCard";
import { styled } from "@mui/material/styles";
import type { AppDispatch } from "../redux/store.ts";

type Tabs = "new" | "popular";

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const [value, setValue] = useState<Tabs>("new");

  const handleChange = (_event: React.SyntheticEvent, newValue: Tabs) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label="lab tabs">
        <Tab label="New" value="new" />
        <Tab label="Popular" value="popular" />
      </TabList>
      <TabPanel value="new" tabIndex={0}>
        <Wrapper>
          <Left>
            <PostCard />
            <PostCard />
          </Left>
          <Right>Comments</Right>
        </Wrapper>
      </TabPanel>
      <TabPanel value="popular" tabIndex={0}>
        Popular
      </TabPanel>
    </TabContext>
  );
};

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "2.4rem",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const Left = styled("div")(() => ({
  flexGrow: 1,
}));

const Right = styled("div")(() => ({
  minWidth: "15rem",
  maxWidth: "30vw",
}));
