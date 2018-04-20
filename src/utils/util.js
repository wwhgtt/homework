exports.getUrlParam = function (param) {
    const reg = new RegExp(`(^|&)${param}=([^&]*)(&|$)`, 'i');
    const r = window.location.search.replace(/\?/g, '&').substr(1).match(reg);
    if (r != null) {
      return (r[2]);
    }
    return null;
  };
  