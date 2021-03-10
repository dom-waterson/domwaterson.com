import { appWithTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <>
      <Component {...pageProps} />{" "}
      <footer>
        <ul>
          {router.locales.map((locale) => (
            <li key={locale}>
              <Link href={router.asPath} locale={locale}>
                <a>{locale}</a>
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </>
  );
};

export default appWithTranslation(MyApp);
