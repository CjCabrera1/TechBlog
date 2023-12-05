let isPublic = true;
const publicBtn = $('#public');
const privateBtn = $('#private');
const postId = $('#blog-title').data('id');

const updateBlogPost = async () => {
  const title = document.querySelector('#blog-title').value.trim();
  const description = document.querySelector('#description').value.trim();
  const authorId = $('.card').attr('id');
  const dateCreated = $('.card').attr('data-created');

  if (title && description) {
    const response = await fetch(`/api/blogPosts`, {
      method: 'PUT',
      body: JSON.stringify({ title, description, isPublic, authorId, dateCreated, postId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/profile`);
    }
  }
};

$('#public').on('click', function (event) {
  event.preventDefault();
  privateBtn.removeClass('selected');
  publicBtn.addClass('selected');
  isPublic = true;
});

$('#private').on('click', function (event) {
  event.preventDefault();
  publicBtn.removeClass('selected');
  privateBtn.addClass('selected');
  isPublic = false;
});

$('#submit').on('click', function (event) {
  event.preventDefault();
  updateBlogPost();
});
