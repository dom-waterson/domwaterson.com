import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "blog");

export function getSortedPostsData(locale) {
  const postIds = fs.readdirSync(postsDirectory);

  const allPostsData = postIds
    .map((slug) => {
      const filename = locale === "en-GB" ? "index.md" : `index.${locale}.md`;
      const fullPath = path.join(postsDirectory, slug, filename);

      if (!fs.existsSync(fullPath)) {
        return;
      }

      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      return {
        slug,
        ...matterResult.data,
      };
    })
    .filter((post) => post);

  return allPostsData;

  // return allPostsData.sort((a, b) => {
  //   if (a.date < b.date) {
  //     return 1;
  //   } else {
  //     return -1;
  //   }
  // });
}

export function getAllPostSlugs(locales) {
  let paths = [];

  const slugs = fs.readdirSync(postsDirectory);

  for (let slug of slugs) {
    for (let locale of locales) {
      let fullpath = path.join(
        postsDirectory,
        slug,
        locale === "en-GB" ? "index.md" : `index.${locale}.md`
      );
      if (!fs.existsSync(fullpath)) {
        continue;
      }

      paths.push({ params: { slug }, locale });
    }
  }

  return paths;
}

export async function getPostData(slug, locale) {
  const fullPath = path.join(
    postsDirectory,
    slug,
    locale === "en-GB" ? "index.md" : `index.${locale}.md`
  );
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  return {
    ...matterResult.data,
    date: matterResult.data.date,
    content: matterResult.content,
  };
}
