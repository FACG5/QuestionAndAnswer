const request = (method, url, data, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var result = JSON.parse(xhr.responseText);
        console.log(result);
        console.log(result.result);
        if (result.err) {
          cb(result.err);
        } else {
          cb(null, result.result);
        }
      } else {
        cb(new TypeError("Something is Error ! "));
      }
    }
  };
  xhr.open(method, url, true);
  xhr.send(data);
};
