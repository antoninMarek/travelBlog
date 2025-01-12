document.addEventListener("DOMContentLoaded", () => {
    const filterSelect = document.querySelector('.filter-select');
    const searchInput = document.querySelector('.search-input');
    const blogContainer = document.querySelector('.blogs-container');

    fetch('./data/articles.json')
        .then(response => response.json())
        .then(data => {
            const renderArticles = (filteredData) => {
                blogContainer.innerHTML = '';
                filteredData.forEach(article => {
                    const blogItem = document.createElement('div');
                    blogItem.classList.add('blog-item');

                    blogItem.innerHTML = `
                        <div class="blog-image">
                            <img src="${article.image}" alt="Blog Image">
                        </div>
                        <div class="blog-content">
                            <h2 class="blog-header">${article.title}</h2>
                            <p class="blog-subheader">By ${article.author} on ${article.date}</p>
                            <p class="blog-text">${article.content.substring(0, 100)}...</p>
                        </div>
                        <div class="blog-arrow">
                            <img src="./icons/arrow-right-solid.svg" alt="Arrow Icon">
                        </div>
                    `;

                    blogContainer.appendChild(blogItem);
                });
            };

            renderArticles(data);

            filterSelect.addEventListener('change', () => {
                const selectedValue = filterSelect.value;
                const filteredData = selectedValue 
                    ? data.filter(article => article.destination.toLowerCase() === selectedValue.toLowerCase())
                    : data;
                renderArticles(filteredData);
            });

            searchInput.addEventListener('input', () => {
                const searchValue = searchInput.value.toLowerCase();
                const filteredData = searchValue 
                    ? data.filter(article => article.content.toLowerCase().includes(searchValue) || article.title.toLowerCase().includes(searchValue))
                    : data;
                renderArticles(filteredData);
            });
        })
        .catch(error => console.error('Error loading articles:', error));
});
