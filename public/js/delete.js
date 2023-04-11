document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
      const id = event.target.getAttribute('like_id');
      deleteItem(id);
    });
  });
  