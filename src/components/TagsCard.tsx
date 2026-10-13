import { Card, CardContent, styled, Typography } from "@mui/material";
import { Tag } from "./Tag";

type TagsCardProps = {
  tags: Array<string>;
};

export const TagsCard = ({ tags }: TagsCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Tags
        </Typography>
        <Tags>
          {tags.map((tag) => (
            <Tag tag={tag} />
          ))}
        </Tags>
      </CardContent>
    </Card>
  );
};

const Tags = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.4rem",
}));
