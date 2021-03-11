import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getSortedPostsData } from "@/lib/posts";
import BlogListItem from "@/components/BlogListItem";

export default function Home({ posts }) {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>Dom Waterson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold">{t("greeting")}</h1>
      <div className="space-y-4">
        {posts.map((item) => (
          <BlogListItem key={item.slug} {...item} locale={locale} />
        ))}
      </div>
    </>
  );
}

export const getStaticProps = async ({ locale }) => {
  const posts = getSortedPostsData(locale);

  const translations = await serverSideTranslations(locale, ["common"]);

  return {
    props: {
      ...translations,
      posts,
    },
  };
};
