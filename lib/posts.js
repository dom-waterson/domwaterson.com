import fs from "fs";
import path from "path";
import matter from "gray-matter";

const localisation = require("../next-i18next.config");

const postsDirectory = path.join(process.cwd(), "content", "blog");

const getFileName = (locale) =>
  locale === localisation.i18n.defaultLocale
    ? "index.md"
    : `index.${locale}.md`;

const getFullPath = (slug, locale) =>
  path.join(postsDirectory, slug, getFileName(locale));

export function getSortedPostsData(locale) {
  const slugs = fs.readdirSync(postsDirectory);

  const allPostsData = slugs
    .map((slug) => {
      const fullPath = getFullPath(slug, locale);

      if (!fs.existsSync(fullPath)) {
        return;
      }

      const matterResult = matter(fs.readFileSync(fullPath, "utf8"));

      return {
        slug,
        ...matterResult.data,
      };
    })
    .filter((post) => post);

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs(locales) {
  let paths = [];

  const slugs = fs.readdirSync(postsDirectory);

  for (let slug of slugs) {
    for (let locale of locales) {
      let fullpath = getFullPath(slug, locale);

      if (!fs.existsSync(fullpath)) {
        continue;
      }

      paths.push({ params: { slug }, locale });
    }
  }

  return paths;
}

export async function getPostData(slug, locale) {
  const fullPath = getFullPath(slug, locale);

  const matterResult = matter(fs.readFileSync(fullPath, "utf8"));

  return {
    ...matterResult.data,
    date: matterResult.data.date,
    content: matterResult.content,
  };
}
