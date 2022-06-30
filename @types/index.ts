export interface ArticleInterface {
  title: string;
  email: string;
  content: string;
  dateCreated: {
    _seconds: number;
  };
}
