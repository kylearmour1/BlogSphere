const onDelete = async (id) => {
  const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
  });

  if (response.ok) {
      document.location.replace('/blogs')
  } else {
      alert(response.statusText);
  }
};

const deletePost = (event) => {
  if (event.target.matches('.delete-btn')) {
    const id = event.target.getAttribute('id');
    onDelete(id);
  }
};

document.addEventListener('click', deletePost);