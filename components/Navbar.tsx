import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/ListTwoTone";
import SearchIcon from "@material-ui/icons/SearchTwoTone";
import AboutIcon from "@material-ui/icons/QuestionAnswerOutlined";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from 'next/router';

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			flexGrow: 1,
			marginBottom: '10px',
			position: 'sticky',
    		top: '0px',
    		opacity: 1,
			zIndex: 1,
			paddingLeft: 0,
			paddingRight: 0,
		},
		toolBarRoot: {
			backgroundColor: '#d9d5cb',
		},
		title: {
			flexGrow: 1,
		},
		icon: {
			verticalAlign: 'middle',
			marginRight: '2px'
		},
		logo: {
			marginLeft: 'auto',
			height: '4rem',
		}
	})
);

const Sa = styled.a`
  color: #554426;
	text-decoration: ${({path, router})=> (path === '/' && router.pathname===path) || (path !== '/' && router.pathname.includes(path)) ? 'underline' : 'none'};
	:visited {
		color: #554426;
	}
  margin-right: 2rem;
  cursor: pointer;
`;

export default function ButtonAppBar() {
	const classes = useStyles();
	const router = useRouter();
	return (
		<div className={classes.root}>
			<AppBar position="sticky">
				<Toolbar className={classes.toolBarRoot}>
					{/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <Link href="/"><a><HomeIcon /></a></Link>
          </IconButton> */}
					<Typography variant="h6" className={classes.title}>
						<Link href="/">
							<Sa path='/' router={router}>
								<HomeIcon className={classes.icon}/>
								Home
							</Sa>
						</Link>
						<Link href="/graph/ListPage">
							<Sa path='ListPage' router={router}>
								<ListIcon className={classes.icon}/>
								Lists
							</Sa>
						</Link>
						<Link href="/graph/SearchPage">
							<Sa path='SearchPage' router={router}>
								<SearchIcon className={classes.icon}/>
								Search
							</Sa>
						</Link>
						<Link href="/About">
							<Sa path='About' router={router}>
								<AboutIcon className={classes.icon}/>
								About
							</Sa>
						</Link>
					</Typography>
					<img src="/film.png" alt="logo" className={classes.logo} />
				</Toolbar>
			</AppBar>
		</div>
	);
}
