import React, { Fragment } from "react";
import { withApollo } from "../apollo/client";
import styled from "styled-components";
import { SummaryMovie } from "../generated/graphql";
import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { BIGIMG_URL } from '../constants';

interface Props {
	topTrending?: SummaryMovie[];
}
const SContainer = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: center;
`;
const SLegend = styled.p`
	font-size: 3vw !important;
`;
const SBanner = styled.img`
	width: 80%;
	height: 8rem;
	flex: 1 1 100%;
	align-self: center;
`;
const Page: NextPage<Props> = ({ topTrending }) => {
	return (
		<Layout>
			<Head>
				<title>
					Movies: search for what's playing, what's trending and where to
					stream!
				</title>
			</Head>
			<SContainer>
				<SBanner src="/now-showing.jpg" alt="now showing"/>
				<Carousel autoPlay infiniteLoop>
					{topTrending?.map((v, i) => (
						<Fragment key={i}>
							<img src={`${BIGIMG_URL}/${v.backdrop}`} />
							<Link href={`/graph/${v.id}`}>
								<a>
									<SLegend className="legend">{v.title}</SLegend>
								</a>
							</Link>
						</Fragment>
					))}
				</Carousel>
			</SContainer>
		</Layout>
	);
};

export default withApollo(Page);
