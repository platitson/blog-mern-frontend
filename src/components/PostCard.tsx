import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Banana from "../assets/banana.jpg";
import type { PostType } from "../types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";
import { Link } from "react-router";
import { formatDate } from "../utils/dateUtils";

type PostCardProps = {
  post: PostType;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card sx={{ marginBottom: "1.6rem" }}>
      <CardMedia
        sx={{ height: 280 }}
        image={post.imageUrl ?? Banana}
        title="Lizard"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <StyledLink to={`/posts/${post._id}`}>{post.title}</StyledLink>
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          By {post.author.fullName}, {formatDate(post.createdAt)}
        </Typography>
        <Views>
          <VisibilityIcon />
          <span>{post.viewsCount}</span>
        </Views>
      </CardContent>
    </Card>
  );
};

const Views = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: "flex",
  gap: "0.4rem",
  marginTop: "0.8rem",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.light,
  "&:hover": {
    textDecoration: "underline",
  },
}));
