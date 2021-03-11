import { format, parseISO } from "date-fns";
import { enGB, es } from "date-fns/locale";

export const Date = ({ dateString, locale }) => {
  const date = parseISO(dateString);

  return (
    <time className="text-gray-600 text-md" dateTime={dateString}>
      {format(date, "LLLL d, yyyy", {
        locale: locale === "en-GB" ? enGB : es,
      })}
    </time>
  );
};

export default Date;
