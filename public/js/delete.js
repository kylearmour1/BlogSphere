const onDelete = async ()=> {
    const response = await fetch('/api/user/delete', {
        method: 'DELETE',

    });
    
    if (response.ok) {
        document.location.replace('/')
    } else {
        alert(response.statusText);
    }
       
};

document.querySelector('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
      const id = event.target.getAttribute('id');
      deleteItem(id);
    });
  });
  