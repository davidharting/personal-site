import React from "react";
import { PageProps } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/Seo";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Seo />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;
