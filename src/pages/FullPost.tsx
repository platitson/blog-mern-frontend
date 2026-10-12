import { Skeleton, styled, Typography } from "@mui/material";
import type { PostType } from "../types";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "../axios";
import { formatDate } from "../utils/dateUtils";
import { Tag } from "../components/Tag";

export const FullPost = () => {
  const [data, setData] = useState<PostType>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Wrapper>
      {loading ? (
        <Skeleton variant="rounded" height={420} sx={{ marginTop: "74px" }} />
      ) : (
        <>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {data.title}
          </Typography>
          {data.imageUrl && <img src={data.imageUrl} alt={data.title} />}
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            By {data.author.fullName}, {formatDate(data.createdAt)}
          </Typography>
          {data.tags && data.tags.map((tag) => <Tag tag={tag} />)}
          <Typography variant="body1">{data.text}</Typography>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "700px",
  margin: "1.6rem auto",
  gap: "1.2rem",

  [theme.breakpoints.down("md")]: {
    width: "95vw",
  },
}));
