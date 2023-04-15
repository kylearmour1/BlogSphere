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

const deletePostHandler = document.querySelector('.delete-btn');

if (deletePostHandler) {
  document.addEventListener('click', (event) => {

    const id = event.target.getAttribute('id');
    onDelete(id);
  });
}