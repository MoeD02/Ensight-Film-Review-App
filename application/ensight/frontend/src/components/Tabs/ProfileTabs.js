import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileFocus from "./ProfileTabsContent/ProfileFocus";
import DiaryFocus from "./ProfileTabsContent/DiaryFocus";
import WatchlistFocus from "./ProfileTabsContent/WatchlistFocus";
import ListsFocus from "./ProfileTabsContent/ListsFocus";
import InsightFocus from "./ProfileTabsContent/InsightFocus";
import TabNavItem from "./TabNav/TabNavItem";
import TabContent from "./TabNav/TabContent";
import "../../assets/styles/components/ProfileTabs.css";
import { getCurrentUser } from "../../APIcalls";

function ProfileTabs({ currentTab, currentUserProfile, id }) {
  const [activeTab, setActiveTab] = useState(currentTab);
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState("");
  const [myUser, setMyUser] = useState("");
  const [isMyPage, setIsMyPage] = useState(false);

  useEffect(() => {
		setActiveTab(currentTab);
		const fetchData = async () => {
			const token = localStorage.getItem("Authorization");
			if (token) {
				setAuthToken(token);
				try {
					const userData = await getCurrentUser(token);
					setMyUser(userData);
					if (userData && userData.id === currentUserProfile.id) {
						setIsMyPage(true);
					}
				} catch (error) {
					console.error("Failed to fetch user data", error);
				}
			} else {
				console.log("no auth");
			}
		};

		fetchData();
	}, [currentTab, currentUserProfile.id]);


  const handleTabClick = (newTab) => {
    setActiveTab(newTab);
    navigate(`/Profile/${currentUserProfile.id}/${newTab}`);
  };

  return (
		<div className="Tabs">
			<ul className="nav">
				<TabNavItem
					title="Profile"
					id="profile"
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					onClick={() => handleTabClick("profile")}
				/>
				<TabNavItem
					title="Diary"
					id="diary"
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					onClick={() => handleTabClick("diary")}
				/>
				{myUser.id === currentUserProfile.id && (
					<TabNavItem
						title="Watchlist"
						id="watchlist"
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						onClick={() => handleTabClick("watchlist")}
					/>
				)}
				<TabNavItem
					title="Lists"
					id="lists"
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					onClick={() => handleTabClick("lists")}
				/>
				<TabNavItem
					title="Insight"
					id="insight"
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					onClick={() => handleTabClick("insight")}
				/>
			</ul>
			<div className="outlet">
				<TabContent id="profile" activeTab={activeTab}>
					<ProfileFocus
						currentUserProfile={currentUserProfile}
						isMyPage={isMyPage}
					/>
				</TabContent>
				<TabContent id="diary" activeTab={activeTab}>
					<DiaryFocus />
				</TabContent>
				<TabContent id="watchlist" activeTab={activeTab}>
					<WatchlistFocus currentUserProfile={currentUserProfile} />
				</TabContent>
				<TabContent id="lists" activeTab={activeTab}>
					<ListsFocus
						currentUserProfile={currentUserProfile}
						isMyPage={isMyPage}
					/>
				</TabContent>
				<TabContent id="insight" activeTab={activeTab}>
					<InsightFocus />
				</TabContent>
			</div>
		</div>
	);
}

export default ProfileTabs;
