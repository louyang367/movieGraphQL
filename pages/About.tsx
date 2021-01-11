import React from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";

const SContainer = styled.div`
    width: 75%;
	margin-left: auto;
    margin-right: auto;
`;
const Sp = styled.p`
    text-align: justify; 
`;

const Page: NextPage = () => {
	return (
		<Layout>
			<Head>
				<title>
					A site built with Apollo GraphQL server with data source on Next.js
				</title>
			</Head>
			<SContainer>
                <h4>Architecure</h4>
                <Sp>This site uses the Jamstack architecure - Javascript/API/Markup. The stack consists of: Serverside rendered React, Apollo GraphQL server on Next.js' api routes, Styled-components and Material-UI for styling.</Sp>
                <Sp>One core principle of Jamstack is that the entire front end is prebuilt into optimized static pages and assets during a build process. This process of pre-rendering results in sites which can be served directly from a CDN. With this site specifically, the first pages of the movie lists and also the genres table that's needed to translate a 'genres code' into English words are retrieved from the offsite data source and built into the page on the fly. Instead of building a page for each request (SSR), with static pages, Next.js automatically does Static Site Generation (SSR). </Sp>
                <Sp>Another feature of Jamstack is the utilization of API. Now we can outsource and receive many complex services such as data, authentication, payments via API calls. With this site, the movie data is retrieved from the nicely documented public REST API by TMDB. When a request arrives, the Apollo GraphQL server makes one or more REST api call to TMDB, and then serve the re-organized and reshaped data to the frontend. This site demonstrates a very convenient way to layer a GraphQL serve on top of any leagacy REST api.</Sp>
                <h4>Pain points</h4>
                <Sp>Debugging the GraphQL server errors as well as the schema-to-type autogeneration errors wasn't easy when all I had to rely on was the error messages. I'll need to look into how the devtools could help. Makeing server side rendering work with the styling libraries turned out to be quite big an issue too. Both Material-UI and Styled-components generate random class names that differ from the server rendering to client side hydration, and there's no out of box solution.</Sp>
                <h4>Code repo</h4>
                <a href="louyang367@github.com/movieGraphQL">louyang367@github.com/movieGraphQL</a>
                <h4>Contact</h4>
                <a href="mailto:louyang01@gmail.com">louyang01@gmail.com</a>
            </SContainer>
		</Layout>
	);
};

export default Page;