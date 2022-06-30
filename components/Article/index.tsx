import { ArticleInterface } from "@types";
import { Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { format, fromUnixTime } from "date-fns";

export default function Article(props: ArticleInterface) {
  const { email, title, dateCreated, content } = props;
  const { _seconds } = dateCreated;
  const date = fromUnixTime(_seconds);
  const formattedDate = format(fromUnixTime(_seconds), "yyyy.MM.dd hh:mm");

  return (
    <Paper elevation={2}>
      <article style={{ padding: '16px' }} >
        <Typography paddingBottom="16px" variant="h5">
          {title}
        </Typography>

        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: content }}
        ></Typography>

        <Divider />

        <footer>
          <Box
            display="flex"
            flexDirection="row"
            gap="12px"
            alignItems="baseline"
            paddingTop="12px"
          >
            <Typography variant="subtitle2">
              <time dateTime={date.toDateString()}>{formattedDate}</time>
            </Typography>

            <Typography variant="inherit">
              ·
            </Typography>

            <Typography variant="overline">{email}</Typography>
          </Box>
        </footer>
      </article>
    </Paper>
  );
}
