document$.subscribe(()=>{
    // window.hljs ? hljs.highlightAll():alert$.next("highlightjs load error!") highlight.js
    window.MathJax = {
      startup: {
          ready:()=> {
            MathJax.startup.defaultReady();
            MathJax.startup.promise.then(()=>{
                window.alert$ && window.alert$.next("公式加载中，请稍候")
            });
          }
      },
      tex2jax: {
        inlineMath: [ ["\\(","\\)"] ],
        displayMath: [ ["\\[","\\]"] ]
      },
      TeX: {
        TagSide: "right",
        TagIndent: ".8em",
        MultLineWidth: "85%",
        equationNumbers: {
          autoNumber: "AMS",
        },
        unicode: {
          fonts: "STIXGeneral,'Arial Unicode MS'"
        }
      },
      displayAlign: "left",
      showProcessingMessages: false,
      messageStyle: "none",
      options: {
        ignoreHtmlClass: ".*|",
        processHtmlClass: "arithmatex"
      }
    };
    // MathJax.typesetPromise() mathjax with instant loading
    // tableSort
    var tables = document.querySelectorAll("article table")
          tables.forEach(function(table) {
            new Tablesort(table)
          })
    }
)
