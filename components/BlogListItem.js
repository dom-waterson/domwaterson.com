import Link from "next/link";
import Date from "./Date";

const BlogListItem = ({ slug, title, date, locale }) => (
  <div className="border border-gray-100 shadow hover:shadow-md hover:border-gray-200 rounded-md p-4 transition duration-200 ease-in">
    <div>
      <Link href={`/blog/${slug}`}>
        <a className="font-bold">{title}</a>
      </Link>
    </div>
    <Date locale={locale} dateString={date} />
  </div>
);

export default BlogListItem;
