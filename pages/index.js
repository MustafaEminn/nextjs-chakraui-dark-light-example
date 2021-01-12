import { Flex, Heading, Image, Text, Wrap, WrapItem } from "@chakra-ui/react";
import unfetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import slug from "slug";
import { Button } from "../components/Button";
import { API_KEY, API_URL } from "../constants/index";
import Layout from "../layout";

export function Home({ movies }) {
  return (
    <div className="container">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Wrap w="100%" mt={5} display="flex" justify="center" spacing="30px">
          {movies.results.map((item, index) => {
            return (
              <WrapItem key={item.id} flexDirection="column" w="500px">
                <Link
                  href="/trends/[slug]"
                  as={`/trends/${slug(
                    item.title || item.original_title || item.name
                  )}-${item.id}`}
                >
                  <a>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                      alt={item.title || item.original_title}
                      loading="lazy"
                      onDragStart={(e) => {
                        return e.preventDefault();
                      }}
                    />
                    <Flex justify="space-between">
                      <Heading as="h4" mt={2}>
                        {item.title || item.original_title || item.name}
                      </Heading>
                      <Button mt={3}>Read more...</Button>
                    </Flex>
                  </a>
                </Link>
              </WrapItem>
            );
          })}
        </Wrap>
      </Layout>
    </div>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await unfetch(`${API_URL}trending/all/day?api_key=${API_KEY}`);
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

export default Home;
