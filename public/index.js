$('#btnSearch').click(() => {
  const query = $('#query').val()
  const page = $('#page').val()
  window.location.assign(`search?q=${query}&page=${page}`)
});

$('#btnRecent').click(() => {
  window.location.assign('recent')
});