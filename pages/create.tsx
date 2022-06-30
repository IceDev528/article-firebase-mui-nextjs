import { NextPage } from "next";
import ArticleCreateForm from "components/ArticleCreateForm";
import { Container } from "@material-ui/core";

const AddArticle: NextPage = () => {
  return (
    <Container maxWidth="sm">
      <ArticleCreateForm />
    </Container>
  );
};

export default AddArticle;
