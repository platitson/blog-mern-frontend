import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Banana from "../assets/banana.jpg";
import type { PostType } from "../types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";

type PostCardProps = {
  post: PostType;
};

export const PostCard = ({ post }: PostCardProps) => {
  const dateFormatted = new Date(post.createdAt).toLocaleDateString("cs-CZ");
  return (
    <Card sx={{ marginBottom: "1.6rem" }}>
      <CardMedia
        sx={{ height: 280 }}
        image={post.imageUrl ?? Banana}
        title="Lizard"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          By {post.author.fullName}, {dateFormatted}
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
