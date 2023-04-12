const deleteComment = async (post_id) => {
    const response = await fetch(`/api/posts/${post_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert("Failed to delete the comment.");
    }
};

const deleteCommentHandler = (event) => {
    if (event.target.matches(".delete-comment")) {
        const id = event.target.getAttribute("data-comment-id");
        deleteComment(post_id);
    }
};

document.addEventListener("click", deleteCommentHandler);  