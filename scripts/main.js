document.addEventListener("DOMContentLoaded", () => {
    fetch('./data/articles.json')
        .then(response => response.json())
        .then(data => {
            const blogContainer = document.querySelector('.blogs-container');
            data.forEach(article => {
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
        })
        .catch(error => console.error('Error loading articles:', error));
});
