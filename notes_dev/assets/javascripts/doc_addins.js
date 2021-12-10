

document$.subscribe(()=>{
    // window.hljs ? hljs.highlightAll():alert$.next("highlightjs load error!") highlight.js
    // tableSort
    var tables = document.querySelectorAll("article table:not([class])") // this line was adjusted #3314
    tables.forEach(function(table) {
      new Tablesort(table)
    })
    // mermaid

    var paletteSwitcher1 = document.getElementById("__palette_1");
    var paletteSwitcher2 = document.getElementById("__palette_2");

    paletteSwitcher1.addEventListener("change", function () {
      location.reload();
    });

    paletteSwitcher2.addEventListener("change", function () {
      location.reload();
    });
});
