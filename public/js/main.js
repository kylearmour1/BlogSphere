const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-name').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  if (title && content) {
    const response = await fetch('/api/blogs/create', { 
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    

    
    if (response.ok) {
      const postData = await fetch('/api/posts');
      const posts = await postData.json();

      const blogListContainer = document.querySelector('.blog-list');
      blogListContainer.innerHTML = '';

      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
        `;
        blogListContainer.appendChild(postElement);
      });

      document.querySelector('#blog-name').value = '';
      document.querySelector('#blog-content').value = '';
    } else {
      alert('Failed to create blog post');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/main');
    } else {
      alert('Failed to delete blog post');
    }
  }
}
};
document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);

document.querySelector('.blog-list').addEventListener('click', delButtonHandler);
