resizeImage(base64, wantedWidth, wantedHeight, callback) {
    var img = document.createElement('img');
    var handler = this;
    img.onload = function () {
      var size = handler.getNewSize(img.width, img.height, wantedWidth, wantedHeight);
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = size.width;
      canvas.height = size.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      var dataURI = canvas.toDataURL('image/jpeg', 0.5);
      callback(dataURI);
    };
    img.src = base64;
  }

  getNewSize(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }