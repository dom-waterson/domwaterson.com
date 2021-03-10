import Head from "next/head";
import { useTranslation } from "next-i18next";

import { getSortedPostsData } from "@/lib/posts";
import BlogListItem from "@/components/BlogListItem";

export default function Blog({ posts }) {
  const { t } = useTranslation("common");

  return (
    <div>
      <Head>
        <title>{`Dom Waterson - ${t("blog")}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-4">
        {posts.map((item) => (
          <BlogListItem key={item.slug} {...item} />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => {
  const posts = getSortedPostsData(locale);

  return {
    props: {
      posts,
    },
  };
};
