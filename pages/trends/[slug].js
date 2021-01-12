import React, { Fragment } from "react";
import Layout from "../../layout";
import { API_KEY, API_URL } from "../../constants";
import unfetch from "isomorphic-unfetch";
import slug from "slug";
import { AspectRatio, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Head from "next/head";

const MovieDetails = ({ movies }) => {
  return (
    <Fragment>
      <Head>
        <title>{movies.title || movies.original_title || movies.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <AspectRatio maxH="500px" ratio={16 / 9} maxW="1920px">
          <Image
            objectFit="fill"
            src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
            alt={movies.title || movies.original_title}
            loading="lazy"
          ></Image>
        </AspectRatio>
        <Flex direction="column" ml={20} mr={20} mt={5}>
          <Heading as="h1">
            {movies.title || movies.original_title || movies.name}
          </Heading>
          <Text fontSize={20} fontWeight={500} mt={5}>
            {movies.overview}
          </Text>
        </Flex>
      </Layout>
    </Fragment>
  );
};

export async function getStaticPaths() {
  const res = await unfetch(`${API_URL}trending/all/day?api_key=${API_KEY}`);
  const movies = await res.json();
  return {
    paths: movies.results.map((item) => {
      return {
        params: {
          slug: `${slug(item.title || item.original_title || item.name)}-${
            item.id
          }`,
        },
      };
    }),
    fallback: false,
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
  const id = params.slug.split("-").pop();
  const res = await unfetch(
    `${API_URL}movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  const movies = await res.json();

  return {
    props: {
      movies,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 600, // In seconds
  };
}
export default MovieDetails;
