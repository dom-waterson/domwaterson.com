import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="mx-auto my-8 w-9/12">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
