import { Card, CardContent, Typography } from "@mui/material";
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
        {tags.map((tag) => (
          <Tag tag={tag} />
        ))}
      </CardContent>
    </Card>
  );
};
