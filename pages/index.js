import Head from "next/head";
import { Inter } from "@next/font/google";
import { useQuery } from "urql";
import styled from "styled-components";
import { GET_MOVIES } from "../graphql/query";
import Movie from "../components/Movie";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import UserLayout from "../components/layouts/UserLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [results] = useQuery({
    query: GET_MOVIES,
    variables: {
      pagination: { limit: 8 },
    },
  });
  const { data, fetching, error } = results;

  const [latest] = useQuery({
    query: GET_MOVIES,
    variables: {
      sort: "date:desc",
      pagination: { limit: 4 },
    },
  });
  const {
    data: latestData,
    fetching: LatestFetching,
    error: LatestError,
  } = latest;

  if (fetching || LatestFetching) return <p>Loading...</p>;
  if (error || LatestError) return <p>Ugh..{error.message}</p>;
  const movies = data.movies.data;
  const LatestMovies = latestData.movies.data;


  return (
    <main>
      <section>
        <div className="flex justify-between">
          <h1 className="p-4">
            Latest Movies Lists
          </h1>
          <Link
            className="pt-5 px-4 "
            href="/movies/LatestMovies"
          >
            view more
          </Link>
        </div>
        <MovieGallery>
          {LatestMovies.map((movie) => (
            <Movie key={movie.attributes.slug} movie={movie} />
          ))}
        </MovieGallery>
      </section>
      <section>
        <div className="flex justify-between">
          <h1 className="p-4">Movies Lists</h1>
          <Link
            className=" pt-5 px-4 "
            href="/movies/AllMovies"
          >
            view more
          </Link>
        </div>
        <MovieGallery>
          {movies.map((movie) => (
            <Movie key={movie.attributes.slug} movie={movie} />
          ))}
        </MovieGallery>
      </section>
    </main>
  );
}

const MovieGallery = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`;
