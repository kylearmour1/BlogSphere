const onDelete = async (id) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/blogs");
  } else {
    alert(response.statusText);
  }
};

const deletePostHandler = (event) => {
  if (event.target.matches(".delete-btn")) {
    const post_id = event.target.getAttribute("id");
    onDelete(post_id);
  }
};

document.addEventListener("click", deletePostHandler);