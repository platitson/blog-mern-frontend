import { Card, CardContent, Typography } from "@mui/material";

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
          <span>#{tag}</span>
        ))}
      </CardContent>
    </Card>
  );
};
