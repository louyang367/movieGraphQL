import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		height: 375,
	},
	media: {
		height: 170,
	},
	overview: {
		height: 85,
		overflow: "hidden",
	},
	stats: {
		// height: 60,
		overflow: "hidden",
		lineHeight: "1.5em",
		textAlign: "left",
	},
});

export default function MovieCard({ movie, genres }) {
	const classes = useStyles();
	return (
		<Link href={`/graph/${movie.id}`}>
			<Card className={classes.root}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={movie.backdrop}
						title={movie.title}
					/>
					<CardContent className={classes.overview}>
						<Typography gutterBottom variant="h6" component="h2">
							{movie.title}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{movie.overview.slice(0, 150)}
						</Typography>
					</CardContent>
					<CardContent>
						<Typography
							variant="subtitle2"
							color="textSecondary"
							component="p"
							className={classes.stats}
						>
							Release date: {movie.releaseDate}
						</Typography>
						<Typography
							variant="subtitle2"
							color="textSecondary"
							component="p"
							className={classes.stats}
						>
							Genres:{" "}
							{movie.genreIds
								?.map((v) => genres && genres[v.toString()])
								.join(", ")}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
}
