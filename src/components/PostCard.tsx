import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import Banana from "../assets/banana.jpg";
import type { PostType } from "../types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";
import { Link } from "react-router";
import { formatDate } from "../utils/dateUtils";
import { Tag } from "./Tag";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type PostCardProps = {
  post: PostType;
  isEditable?: boolean;
};

export const PostCard = ({ post, isEditable }: PostCardProps) => {
  return (
    <StyledCard>
      <CardMedia
        sx={{ height: 280 }}
        image={post.imageUrl ? `http://localhost:4444${post.imageUrl}` : Banana}
        title={post.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <StyledLink to={`/posts/${post._id}`}>{post.title}</StyledLink>
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          By {post.author.fullName}, {formatDate(post.createdAt)}
        </Typography>
        <FlexWrapper>
          <Tags>
            {post.tags.map((tag) => (
              <Tag tag={tag} />
            ))}
          </Tags>
          <Views>
            <VisibilityIcon />
            <span>{post.viewsCount}</span>
          </Views>
        </FlexWrapper>
        {isEditable && (
          <Actions>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Actions>
        )}
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(Card)(() => ({
  marginBottom: "1.6rem",
  position: "relative",
  "&:hover": {
    ".MuiButtonBase-root": {
      opacity: "1",
    },
  },
}));

const Views = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: "flex",
  gap: "0.4rem",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.light,
  "&:hover": {
    textDecoration: "underline",
  },
}));

const FlexWrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "0.8rem",
  marginTop: "0.8rem",
}));

const Tags = styled("div")(() => ({
  display: "flex",
  gap: "0.4rem",
}));

const Actions = styled("div")(() => ({
  position: "absolute",
  top: "0.4rem",
  right: "0.4rem",
  ".MuiButtonBase-root": {
    opacity: "0",
  },
}));
