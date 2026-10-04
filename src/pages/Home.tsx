import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/posts.ts";
import { Tab, Skeleton } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { PostCard } from "../components/PostCard";
import { styled } from "@mui/material/styles";
import type { AppDispatch, RootState } from "../redux/store.ts";

type Tabs = "new" | "popular";

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, tags } = useSelector((state: RootState) => state.posts);
  const isPostsLoading = posts.status === "loading";

  console.log(tags);

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
            {isPostsLoading ? (
              <Skeleton variant="rounded" height={420} />
            ) : (
              posts.items.map((post, idx) => <PostCard key={idx} post={post} />)
            )}
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
