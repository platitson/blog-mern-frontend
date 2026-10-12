import { styled } from "@mui/material/styles";

type TagProps = {
  tag: string;
};

export const Tag = ({ tag }: TagProps) => {
  return <StyledTag>{tag}</StyledTag>;
};

const StyledTag = styled("div")(({ theme }) => ({
  display: "flex",
  width: "fit-content",
  padding: "0 0.8rem",
  marginRight: "o.4rem",
  borderRadius: "0.4rem",
  backgroundColor: theme.palette.info.main,
}));
