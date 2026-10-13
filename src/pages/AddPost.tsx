import { useSelector } from "react-redux";
import { isAuthSelector } from "../redux/slices/auth";
import { Navigate, useNavigate } from "react-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Button, Paper, styled, TextField, Typography } from "@mui/material";
import SimpleMDE, { type SimpleMDEReactProps } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import type { PostSchemaType } from "../types";
import axios from "../axios";
import { theme } from "../theme";

function usePostForm() {
  return useForm<PostSchemaType>({
    defaultValues: {
      title: "",
      text: "",
      tags: [],
      imageUrl: "",
    },
  });
}

export const AddPost = () => {
  const isAuth = useSelector(isAuthSelector);
  const navigate = useNavigate();
  const inputFileRef = useRef(null);
  const [imageUploadError, setImageUploadError] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [textValue, setTextValue] = useState<string>("");
  const [tagsString, setTagsString] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const options: SimpleMDEReactProps["options"] = useMemo(
    () => ({
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Start typing...",
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = usePostForm();

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.log(err);
      setImageUploadError("Image upload failed");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = useCallback((value) => {
    setTextValue(value);
  }, []);

  const onSubmit = async (values: PostSchemaType) => {
    values.imageUrl = imageUrl;
    values.tags = tagsString.trim() ? tagsString.trim().split(/\s+/) : [];
    values.text = textValue;

    try {
      setLoading(true);
      const { data } = await axios.post("/posts", values);
      const id = data._id;
      navigate(`/posts/${id}`);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Post creation failed");
    }
  };

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper sx={{ padding: "1.6rem" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {imageUrl ? (
          <>
            <div>
              <img
                width={300}
                src={`http://localhost:4444${imageUrl}`}
                alt="Uploaded"
              />
            </div>
            <Button variant="outlined" onClick={onClickRemoveImage}>
              Remove Image
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => inputFileRef.current.click()}
              variant="outlined"
            >
              Upload image
            </Button>
            <input
              ref={inputFileRef}
              type="file"
              onChange={handleChangeFile}
              hidden
            />
            {imageUploadError && (
              <Typography
                sx={{ color: theme.palette.error.main, marginTop: "0.4rem" }}
              >
                {imageUploadError}
              </Typography>
            )}
          </>
        )}
        <TextField
          variant="standard"
          placeholder="Add article title"
          fullWidth
          sx={{ margin: "1.2rem 0" }}
          {...register("title", { required: true })}
          helperText={errors.title?.message}
          error={Boolean(errors.title)}
        />
        <SimpleMDE value={textValue} onChange={onChange} options={options} />
        <TextField
          variant="standard"
          placeholder="Type tags separated by spaces"
          value={tagsString}
          onChange={(e) => setTagsString(e.target.value)}
          fullWidth
          sx={{ marginBottom: "0.8rem" }}
        />
        <ButtonBar>
          <Button variant="contained" type="submit" disabled={loading}>
            Publish
          </Button>
          <Button component={Link} to="/" disabled={loading}>
            Cancel
          </Button>
        </ButtonBar>
      </form>
    </Paper>
  );
};

const ButtonBar = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.4rem",
  marginTop: "1.6rem",
}));
