import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
	const { pathname } = useLocation();
	const prevPathname = useRef();

	useEffect(() => {
		// Check if the user is on a Profile page and the currentTab is changing
		const isProfilePage = pathname.startsWith("/Profile/");
		const isChangingTab =
			prevPathname.current &&
			prevPathname.current.startsWith("/Profile/") &&
			pathname !== prevPathname.current;

		// Scroll to top only if it's not a Profile page with the same tab
		if (!isProfilePage || !isChangingTab) {
			window.scrollTo(0, 0);
		}

		// Update the previous pathname
		prevPathname.current = pathname;
	}, [pathname]);

	return null;
};

export default ScrollToTop;
