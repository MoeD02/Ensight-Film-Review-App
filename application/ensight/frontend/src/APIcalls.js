const apiUrl = 'http://127.0.0.1:8000';

export const getUsers = async (filter = 'ALL') => {
  const data = { filter };

  const response = await fetch(`${apiUrl}/get_users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return await response.json();
  } else {
    console.error('Failed to fetch user data');
    return null;
  }
};



export const searchMovies = async (searchTerm) => {
    const data = {
      content: searchTerm,
    };
  
    const response = await fetch(`${apiUrl}/search_movies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch movie data');
      return null;
    }
  };
  


  export const fetchMovies = async (filter, amount) => {
    const data = {
      filter: filter,
      amount: amount,
    };
  
    const response = await fetch(`${apiUrl}/fetch_movies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch movie data');
      return null;
    }
  };



  export const getUserMovieLists = async (filter, amount) => {
    const data = {
      filter: filter,
      amount: amount,
    };
  
    const response = await fetch(`${apiUrl}/get_user_movie_lists/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch list data');
      return null;
    }
  };