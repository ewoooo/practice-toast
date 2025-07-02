import React from "react";

export const useKeydown = (key, callback) => {
	if (typeof key !== "string") {
		throw new Error("Invalid value: ", key);
	}

	React.useEffect(() => {
		function handler(event) {
			if (event.code === key) {
				callback(event);
			}
		}

		document.addEventListener("keydown", handler);

		return () => {
			document.removeEventListener("keydown", callback);
		};
	}, [key, callback]);
};

function Utils() {
	return <div></div>;
}

export default Utils;
