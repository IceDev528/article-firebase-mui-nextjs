import type { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import { ArticleInterface } from "@types";
import Article from "components/Article";
import { Container } from "@material-ui/core";
import { Box } from "@mui/system";

type Props = {
  articles: ArticleInterface[];
  status: number | boolean;
};

const Home: NextPage<Props> = (props: Props) => {
  const { articles = [], status } = props;

  if (status) {
    return <Error statusCode={+status} />;
  }

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" gap="24px">
        {articles.length > 0
          ? articles.map((item: ArticleInterface) => (
            <Article {...item} key={item.title} />
          ))
          : "Nothing to show"}
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";

  const response = await fetch(baseUrl + "/api/articles");
  const status = response.ok ? false : response.status;
  const { data } = await response.json();

  return {
    props: {
      articles: data,
      status,
    },
  };
};

export default Home;
