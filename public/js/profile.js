const deleteBlogPost = async (id) => {
    const response = await fetch(`/api/blogPosts/${id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      document.location.replace('/profile');
    }
  };
  
  const editBlogPost = async (id) => {
    const response = await fetch(`/edit/${id}`, {
      method: 'GET',
    });
  
    if (response.ok) {
      document.location.replace(`/edit/${id}`);
    } else {
      alert('Failed to delete project');
    }
  };
  
    $('button').on('click', function(event) {
      event.preventDefault();
      const button = $(this).attr('id')
      const id = $(this).parent().attr('id')
  
      if (button === 'edit') {
        editBlogPost(id)
      } else if (button === 'delete') {
        deleteBlogPost(id)
      }
    })