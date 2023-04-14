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

document.querySelector(".delete-btn").addEventListener("click", (event) => {
  const id = event.target.getAttribute("id");
  onDelete(id);
});
