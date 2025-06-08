const categoryButtons = document.querySelectorAll('.category-btn');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Here you would typically filter news by category
        const category = button.dataset.category;
        console.log(`Selected category: ${category}`);
        
        // In a real application, you would filter the news items
        // or make an API call to get news for the selected category
    });
});

// Search functionality
const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log(`Searching for: ${searchTerm}`);
            // In a real application, you would redirect to search results
            // or make an API call to search for news
            alert(`검색어 "${searchTerm}"에 대한 결과를 찾고 있습니다...`);
        }
    }
});

// Load more button
const loadMoreBtn = document.querySelector('.load-more-btn');

loadMoreBtn.addEventListener('click', () => {
    console.log('Loading more news...');
    // In a real application, you would load more news items
    // or make an API call to get more news
    alert('추가 뉴스를 로딩 중입니다...');
});