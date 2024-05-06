window.shareConfig = {
  // before share,we should call encodeURIComponent on each string property
  fullUrl: window.location.href,
  title: document.title,
  site: window.location.origin,
  // without site
  defaultImg: document.querySelector(".md-content img") && document.querySelector(".md-content img").getAttribute("src"),
  defaultSummary: document.querySelector("meta[name=\"description\"]").getAttribute("content"),
  qzoneShare(_title, _img, _summary) {
    let shareUrl = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(this.fullUrl)}
             &site=${encodeURIComponent(this.site)}&title=${encodeURIComponent(_title || this.title)}&pics=${encodeURIComponent(_img || this.defaultImg)}
             &summary=${encodeURIComponent(_summary || this.defaultSummary)}`;
    window.open(shareUrl);
  },
  qqShare(title, img, summary, desc) {

  },
  renrenShare(title, desc) {

  }
  // shareURLs:{
  //     qzone:`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${fullUrl}
  //     &site=${site}&title=${title}&`
  // }
};
