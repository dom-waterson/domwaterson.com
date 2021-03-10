import Head from "next/head";
import { format, parseISO } from "date-fns";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";

import { getPostData, getAllPostSlugs } from "@/lib/posts";

export default function BlogPage({ title, date, content }) {
  const hydratedContent = hydrate(content);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="border-b-2 border-gray-200 mb-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="text-gray-600 text-md">
            {format(parseISO(date), "MMMM do, uuu")}
          </div>
        </div>
        <div className="prose">{hydratedContent}</div>
      </main>
    </div>
  );
}

export const getStaticPaths = async ({ locales }) => {
  const paths = await getAllPostSlugs(locales);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params, locale }) => {
  const { title, content, date } = await getPostData(params.slug, locale);

  const mdxSource = await renderToString(content);

  return {
    props: { title, content: mdxSource, date },
  };
};
