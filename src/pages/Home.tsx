import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/posts.ts";
import { Tab, Skeleton } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { PostCard } from "../components/PostCard";
import { styled } from "@mui/material/styles";
import type { AppDispatch, RootState } from "../redux/store.ts";
import { TagsCard } from "../components/TagsCard.tsx";

type Tabs = "new" | "popular";

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.data);
  const { posts, lastTags, status } = useSelector(
    (state: RootState) => state.posts
  );
  const isPostsLoading = status === "loading";

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
              posts.map((post, idx) => (
                <PostCard
                  key={idx}
                  post={post}
                  isEditable={userData?._id === post.author._id}
                />
              ))
            )}
          </Left>
          <Right>
            {isPostsLoading ? (
              <Skeleton variant="rounded" height={105} />
            ) : (
              <TagsCard tags={lastTags} />
            )}
          </Right>
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
  width: "18rem",
}));
