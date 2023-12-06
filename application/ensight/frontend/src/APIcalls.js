const apiUrl = "http://127.0.0.1:8000";

export const initUser = async () => {
    let token = localStorage.getItem('Authorization');
    if(token) {
        const user = await getCurrentUser(token);

        if(user != null) {
            return {
                name: user.username,
                id: user.id,
                token: token,
            }
        }
        else {
            // remove expired token
            localStorage.removeItem('Authorization');
        }
    }
    return null;
};


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

export const getUserMovieLists = async (filter, amount) => {
    const data = {
        filter: filter,
        amount: amount,
    };

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
    const data = {
        list_details: info.list_details,
        movies_in_list: info.movie_ids,
    };

    const response = await fetch(`${apiUrl}/create_movie_list/`, {
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

export const isLikedByUser = async (userID, movieID) => {
    let data = {
        user_id: userID,
        movie_id: movieID,
    };
    const response = await fetch(`${apiUrl}/user_likes_movie`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.error(response);
        return null;
    }
};
