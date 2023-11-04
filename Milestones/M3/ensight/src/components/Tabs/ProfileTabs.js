import React, { useState } from "react";
import ProfileFocus from "./ProfileTabsContent/ProfileFocus";
import DiaryFocus from "./ProfileTabsContent/DiaryFocus";
import WatchlistFocus from "./ProfileTabsContent/WatchlistFocus";
import ListsFocus from "./ProfileTabsContent/ListsFocus";
import InsightFocus from "./ProfileTabsContent/InsightFocus";
import TabNavItem from "./TabNav/TabNavItem";
import TabContent from "./TabNav/TabContent";
import '../../assets/styles/components/ProfileTabs.css';

function ProfileTabs() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        
        <div className="Tabs">
            <ul className="nav">
                <TabNavItem title="Profile" id="profile" activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title="Diary" id="diary" activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title="Watchlist" id="watchlist" activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title="Lists" id="lists" activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title="Insight" id="insight" activeTab={activeTab} setActiveTab={setActiveTab}/>
            </ul>
            <div className="outlet">
                <TabContent id="profile" activeTab={activeTab}>
                    <ProfileFocus />
                </TabContent>
                <TabContent id="diary" activeTab={activeTab}>
                    <DiaryFocus />
                </TabContent>
                <TabContent id="watchlist" activeTab={activeTab}>
                    <WatchlistFocus />
                </TabContent>
                <TabContent id="lists" activeTab={activeTab}>
                    <ListsFocus />
                </TabContent>
                <TabContent id="insight" activeTab={activeTab}>
                    <InsightFocus />
                </TabContent>
            </div>
        </div>
      );
}

export default ProfileTabs;