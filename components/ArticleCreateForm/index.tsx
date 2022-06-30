import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Paper, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import Notification from "components/Notification";

type FormData = {
  title: string;
  content: string;
  email: string;
};

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function ArticleCreateForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      email: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    error: false,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const richText = data.content.replace(/\n\r?/g, "<br />");
    const JSONData = JSON.stringify({ ...data, content: richText });

    const endpoint = "/api/articles";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONData,
    };

    try {
      const response = await fetch(endpoint, options);

      const result = await response.json();

      if (result.success) {
        reset();
        setNotification((state) => ({
          ...state,
          open: true,
        }));
      } else {
        setNotification((state) => ({
          ...state,
          error: true,
          open: true,
        }));
      }

      setLoading(false);
    } catch (e) {
      console.error(e);
      setNotification((state) => ({
        ...state,
        error: true,
        open: true,
      }));
      setLoading(false);
    }
  });

  return (
    <Paper
      sx={{ padding: "16px"}}
      variant="elevation"
    >
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap="24px"
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.title ? errors.title.message : null}
              error={!!errors?.title}
              required
              label="Title"
              variant="outlined"
            />
          )}
          rules={{
            required: "Required field",
          }}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.email ? errors.email.message : null}
              error={!!errors?.email}
              required
              id="email"
              type="email"
              label="Email"
              variant="outlined"
            />
          )}
          rules={{
            required: "Required field",
            pattern: {
              value: regexEmail,
              message: "Please enter a valid email address",
            },
          }}
        />

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              variant="filled"
              label="Content"
              multiline
              helperText={
                errors.content
                  ? errors.content.message
                  : `Max ${field.value?.length}/500`
              }
              error={!!errors.content}
              rows={20}
            />
          )}
          rules={{
            required: "Required field",
            maxLength: {
              value: 500,
              message: "Max is 500",
            },
          }}
        />

        <Box display="flex" gap="16px">
          <LoadingButton
            disabled={!isValid}
            type="submit"
            variant="outlined"
            color="primary"
            style={{ margin: 'auto' }}
            loading={loading}
            startIcon={<SendIcon />}
          >
            Submit
          </LoadingButton>
        </Box>
      </Box>
      <Notification
        onClose={() => setNotification((state) => ({ ...state, open: false }))}
        open={notification.open}
        type={notification.error ? "error" : "success"}
      ></Notification>
    </Paper>
  );
}
