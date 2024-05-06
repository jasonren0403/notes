document$.subscribe(() => {
  // window.hljs ? hljs.highlightAll():alert$.next("highlightjs load error!") highlight.js
  // tableSort
  // https://squidfunk.github.io/mkdocs-material/reference/data-tables/?h=table#sortable-tables
  var tables = document.querySelectorAll("article table:not([class])"); // this line was adjusted #3314
  tables.forEach(function(table) {
    new Tablesort(table);
  });
  // pangu.js
  // https://github.com/vinta/pangu.js
  // listen to any DOM change and automatically perform spacing via MutationObserver()
  pangu.autoSpacingPage();
});
