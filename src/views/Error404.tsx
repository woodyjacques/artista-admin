import { Link } from "react-router-dom";

export function Error404() {

  return (
    <div>
      <section className="bg-white dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
            Page not found
          </h1>
          <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-gray-200">
            Lo sentimos, no pudimos encontrar la página que estas buscando.
          </p>
          <Link to="/">
            <button className="text-white bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
              Inicio
            </button>
          </Link>
        </div>
        <div className="bg-gradient-to-b to-transparent from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
      </section>
    </div>
  );
}

export default Error404;
