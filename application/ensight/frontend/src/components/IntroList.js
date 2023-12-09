import React, { useState, useEffect } from "react";
import "../assets/styles/components/IntroList.css";

import listItems1 from "../assets/images/list1.png";
import listItems2 from "../assets/images/list2.png";
import listItems3 from "../assets/images/list3.png";
import listItems4 from "../assets/images/list4.png";
import listItems5 from "../assets/images/list5.png";

const listItems = [listItems1, listItems2, listItems3, listItems4, listItems5];

const IntroList = () => {
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		const slide = () => {
			setOffset((prevOffset) => {
				if (prevOffset <= -100 * listItems.length) {
					return 0;
				}
				return prevOffset - 1;
			});
		};

		const interval = setInterval(slide, 50);
		return () => clearInterval(interval);
	}, []);
    return (
        <div className="list-slider">
            <div 
                className="list-slides" 
                // style={{ transform: `translateX(${offset}%)` }}
            >
                {/* Double the array for seamless loop effect */}
                {listItems.concat(listItems).map((src, index) => (
                    <img
                        key={index}
                        className="list-slide"
                        src={src}
                        alt=""
                    />
                ))}
            </div>
        </div>
    );
}
export default IntroList;
