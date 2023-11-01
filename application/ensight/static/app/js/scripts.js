function search() {
    let searchBox = document.getElementById('searchBox');
    let searchType = document.getElementById('searchType');
    let moviePosters = document.getElementById('moviePosters');
    let userReviews = document.getElementById('userReviews');

    if (searchType.value === 'username') {
        moviePosters.style.display = 'none';
        userReviews.style.display = 'block';
        // Fetch and populate user reviews (using APIs or other methods).
    } else if (searchType.value === 'movie') {
        userReviews.style.display = 'none';
        moviePosters.style.display = 'block';
        // Highlight or segregate the searched movie.
    }
}