const apiUrl = "http://127.0.0.1:8000";

export const getUsers = async (filter, amount) => {
	const data = {
		filter: filter,
		amount: amount,
	};

	const response = await fetch(`${apiUrl}/get_users/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		return await response.json();
	} else {
		console.error("Failed to fetch user data");
		return null;
	}
};

export const searchUsers = async (searchTerm) => {
	const data = {
		content: searchTerm,
	};

	const response = await fetch(`${apiUrl}/search_users/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		return await response.json();
	} else {
		console.error("Failed to fetch user data");
		return null;
	}
};

export const getUserProfileById = async (userId) => {
	const data = {
		id: userId,
	};

	const response = await fetch(`${apiUrl}/get_user_profile_by_id/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		return await response.json();
	} else {
		console.error("Failed to fetch user data by ID");
		return null;
	}
};

export const searchMovies = async (searchTerm, filter, genres, years) => {
	const data = {
		content: searchTerm,
		filter: filter,
		genres: genres,
		years: years,
	};

	const response = await fetch(`${apiUrl}/search_movies/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		return await response.json();
	} else {
		console.error("Failed to fetch movie data");
		return null;
	}
};

export const fetchMovies = async (filter, genres, years, amount) => {
	const data = {
		filter: filter,
		amount: amount,
		genres: genres,
		years: years,
	};

	const response = await fetch(`${apiUrl}/fetch_movies/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		return await response.json();
	} else {
		console.error("Failed to fetch movie data");
		return null;
	}
};

export const fetchMoviesByIds = async (movieIds) => {
	const data = {
		movie_ids: movieIds,
	};

	const response = await fetch(`${apiUrl}/fetch_movies_by_ids/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		return await response.json();
	} else {
		console.error("Failed to fetch movie data by IDs");
		return null;
	}
};
export const getMovieDetails = async (id) => {
	const data = {
		id: id,
	};
	const response = await fetch(`${apiUrl}/get_movie_details/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (response.ok) {
		return await response.json();
	} else {
		console.error("Failed to fetch list data");
		return null;
	}
};

export const getUserMovieLists = async (filter, amount, id) => {
	let data;
	
	if(amount==null){
			data = {
			filter: filter,
			id: id,
		};
	}
	else{
		data = {
			filter: filter,
			amount: amount,
			id: id,
	}
}
	

	const response = await fetch(`${apiUrl}/get_user_movie_lists/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		return await response.json();
	} else {
		console.error("Failed to fetch list data");
		return null;
	}
};

export const searchUserMovieLists = async (searchTerm) => {
	const data = {
		content: searchTerm,
	};

	const response = await fetch(`${apiUrl}/search_user_movie_lists/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		return await response.json();
	} else {
		console.error("Failed to fetch user movie lists");
		return null;
	}
};

export const createMovieList = async (info) => {
	const response = await fetch(`${apiUrl}/create_movie_list/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info),
	});

	if (response.ok) {
		return await response.json();
	} else {
		console.error("Failed to create user movie lists");
		return null;
	}
};
export const addToFavorites = async (movieId, authToken) => {
	const data = {
		movie_id: movieId,
	};

	const response = await fetch(`${apiUrl}/add_to_favorites/`, {
		method: "POST",
		headers: {
			Authorization: authToken,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		return await response.json();
	} else {
		console.error("Failed to add movie to favorites");
		return null;
	}
};

export const removeFromFavorites = async (movieId, authToken) => {
	const data = {
		movie_id: movieId,
	};

	const response = await fetch(`${apiUrl}/remove_from_favorites/`, {
		method: "POST",
		headers: {
			Authorization: authToken,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		return await response.json();
	} else {
		console.error("Failed to remove movie from favorites");
		return null;
	}
};

export const updateUserProfile = async (profileUpdateInfo,authToken) => {
	try {
		const formData = new FormData();
		formData.append("id", profileUpdateInfo.id);
		formData.append("new_username", profileUpdateInfo.new_username);
		formData.append("new_bio", profileUpdateInfo.new_bio);
		formData.append("new_avatar", profileUpdateInfo.new_avatar);

		const response = await fetch(`${apiUrl}/update_user_profile/`, {
			method: "POST",
			headers: {
				Authorization: authToken,
			},
			body: formData,
		});

		if (!response.ok) {
			// Handle error response, you can throw an error or handle it as needed
			throw new Error(`Error: ${response.status} - ${response.statusText}`);
		}

		const data = await response.json();
		console.log(data.message); // Log the success message

		// You can perform additional actions or update the UI as needed
	} catch (error) {
		console.error("Error:", error.message);
		// Handle error, update UI, show error messages, etc.
	}
};

export const getCurrentUser = async (authToken) => {
	const response = await fetch(`${apiUrl}/accounts/current_user`, {
		method: "GET",
		headers: {
			Authorization: authToken,
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		return await response.json();
	} else {
		console.error("Failed to fetch current logged in user");
		return null;
	}
};
