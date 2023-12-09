import { useNavigate } from "react-router-dom";
import "../assets/styles/pages/Home.css";
import IntroMovie from "../components/IntroMovie";
import IntroFeed from "../components/IntroFeed";
import PosterCarousel from "../components/PosterCarousel";
import IntroList from "../components/IntroList";
import { getUser } from "../APIcalls";
import React, { useEffect, useState } from "react";

function Home() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	useEffect(() => {
		const initPage = async () => {
			let userInfo = await getUser();
			if (!!userInfo) {
				setUser(userInfo);
			}
		};
		initPage();
	}, []);
	return (
		<div className="home-container">
			<PosterCarousel />

			<div className="movie-showcase-container">
				<div className="header-section">
					<h1>Lights, Camera, Connect!</h1>
					<p>
						From directors to doodlers, discover the maestros behind the magic
						<br /> Your direct line to Hollywood’s heartbeat
					</p>
					<button
						className="view-movies-btn"
						onClick={() => navigate("/Browse")}>
						{" "}
						Browse Movies{" "}
					</button>
				</div>
			</div>

			<IntroMovie />

			<div className="feed-showcase-container">
				<div className="title-section">
					<h1>
						Get reel-time updates from <br />
						your cine-crew!
					</h1>
					<p>
						Dive into the latest buzz, direct from the film fanatics. Your feed,
						their thoughts - all things movies
					</p>
					<button className="view-feed-btn" onClick={() => navigate("/Feed")}>
						{" "}
						Take me to Feed
					</button>
				</div>
			</div>

			<IntroFeed />

			<div className="list-showcase-container">
				<div className="heading-section">
					<h1>
						Cine-lists, where your movie mood <br />
						takes shape!
					</h1>
					<p>
						Craft your ultimate film collection or explore curated gems. <br />
						Whether it's all-time faves or hidden indie treasures, make your
						list and check it twice
					</p>
					<button
						className="view-list-btn"
						onClick={() => navigate(`/Profile/${user.id}/lists`)}>
						{" "}
						Create Lists
					</button>
				</div>
			</div>

			<IntroList />
		</div>
	);
}

export default Home;
