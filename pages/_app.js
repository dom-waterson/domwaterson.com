import { appWithTranslation } from "next-i18next";

import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);
