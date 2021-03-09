import Link from "next/link";
import { format, parseISO } from "date-fns";

function BlogListItem({ slug, title, date, content }) {
  return (
    <div className="border border-gray-100 shadow hover:shadow-md hover:border-gray-200 rounded-md p-4 transition duration-200 ease-in">
      <div>
        <Link href={`/blog/${slug}`}>
          <a className="font-bold">{title}</a>
        </Link>
      </div>
      <div className="text-gray-600 text-xs">
        {format(parseISO(date), "MMMM do, uuu")}
      </div>
      <div>{content.substr(0, 300)}</div>
    </div>
  );
}

export default BlogListItem;
