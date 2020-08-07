const qn = require("qn");
const path = require("path");
const fs = require("fs");
const { resolve } = require("path");

const config = {
  video: {
    accessKey: "Lq3qsBMZiqIOh94xcpkswuxcPQsGfIuQRk9SZEm0",
    secretKey: "sIh6bnffxFtCA1qPAAENYjUI2PitDVGJbdFVjrpO",
    bucket: "cocoet-videos",
    origin: "videos.cdn.cocoet.cn",
    uploadURL: "up-z2.qiniup.com",
  },
  image: {
    accessKey: "Lq3qsBMZiqIOh94xcpkswuxcPQsGfIuQRk9SZEm0",
    secretKey: "sIh6bnffxFtCA1qPAAENYjUI2PitDVGJbdFVjrpO",
    bucket: "cocoet",
    origin: "assets.cdn.cocoet.cn",
  }
};

// read array of files
// { path, name }

const fileNames = fs.readdirSync(path.join("dist"));
// console.log(fileNames);
const filePath = path.join(__dirname, "../../dist");
// console.log(filePath);

let arr = fileNames
  .filter((e) => e.endsWith(".mp4"))
  .map((name) => {
    return {
      path: path.join(filePath, name),
      name: name,
    };
  });
// console.log(arr.length);

const uploadWithConfig = async (config, file) => {
  return new Promise((resolve, reject) => {
    const options = { key: "/coursewares/" + file.name };
    qn.create(config).uploadFile(file.path, options, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};
// arr = [
//   {
//     path: "/Users/aisukora/reveal.js/screenshot.png",
//     name: "screenshot.png",
//   },
// ];
(async function () {
  for (let vf of arr) {
    const result = await uploadWithConfig(config.video, vf);
    console.log(result);
  }
})();
