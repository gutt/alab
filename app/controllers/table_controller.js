//load('table');

action('table', function () {
  
  var algo = {};
  algo['content'] = 'dupa';
  algo['id'] = 1;
  render(
  {
      algorithm: algo,
      title: 'dupa'
  });
});