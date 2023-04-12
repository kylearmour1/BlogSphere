const deletePost = async (id) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace('/blogs');
  } else {
    alert("Failed to delete the post.");
  }
};

const deletePostHandler = (event) => {
  if (event.target.matches(".delete-blog")) {
    const id = event.target.getAttribute("data-id");
    deletePost(id);
  }
};

document.addEventListener("click", deletePostHandler);
