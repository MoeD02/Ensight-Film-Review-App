const apiUrl = 'http://127.0.0.1:8000';

export const getUsers = async (filter, amount) => {
  const data = { 
    filter: filter,
    amount: amount,
   };

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

export const searchUsers = async (searchTerm) => {
  const data = {
    content: searchTerm,
  };

  const response = await fetch(`${apiUrl}/search_users/`, {
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


export const searchMovies = async (searchTerm , filter , genres , years) => {
    const data = {
      content: searchTerm,
      filter: filter,
      genres:genres,
      years: years,
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
  


  export const fetchMovies = async (filter, genres , years, amount) => {
    const data = {
      filter: filter,
      amount: amount,
      genres:genres,
      years: years,
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
export const getMovieDetails = async(id)=>{
  const data = {
    id: id,
  };
  const response = await fetch(`${apiUrl}/get_movie_details/`, {
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
  export const searchUserMovieLists = async (searchTerm) => {
    const data = {
      content: searchTerm,
    };
  
    const response = await fetch(`${apiUrl}/search_user_movie_lists/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch user movie lists');
      return null;
    }
  };