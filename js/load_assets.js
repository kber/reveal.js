const fs = require("fs");
const path = require("path");
const download = require("download");
const url = require("url");

const courses = [
  { name: "顺序结构" },
  { name: "冒险故事绘本" },
  { name: "玩转电子音乐" },
  { name: "调试：Bug与Debug" },
  { name: "除虫大作战" },
  { name: "循环基础1" },
  { name: "王牌空战" },
  { name: "循环基础 2" },
  { name: "水果忍者" },
  { name: "植物大战僵尸" },
  { name: "条件基础1" },
  { name: "时空穿梭" },
  { name: "变量基础1" },
  { name: "小猪存钱罐" },
  { name: "疯狂天气" },
  { name: "事件基础" },
  { name: "街舞派对" },
  { name: "嵌套循环基础" },
  { name: "烟花实验室" },
  { name: "钓鱼达人" },
  { name: "条件基础2" },
  { name: "荒岛求生" },
  { name: "变量基础2" },
  { name: "垃圾分类" },
  { name: "无人超市" },
  { name: "函数基础1" },
  { name: "愤怒的小鸟" },
  { name: "函数基础 2" },
  { name: "王牌信息特工" },
  { name: "太阳系的奥秘" },
  { name: "Python 基础 - 认识 Python 语言" },
  { name: "Python 基础 01" },
  { name: "Python 基础 02 - 数字变量与简单运算" },
  { name: "Python 基础 03 - 简单循环 - 可可大冒险" },
  { name: "Python 基础 04 - 简单循环 - 可可小画家" },
  { name: "Python 基础 05 - 数字类型的乘除操作" },
  { name: "Python 基础 06 - 数字类型混合运算" },
  { name: "Python 基础 07 - 数字变量的随机数" },
  { name: "Python 基础 08 - 条件基础1 - 可可大冒险" },
  { name: "Python 基础 09 - 条件基础2 - 可可小画家" },
  { name: "Python 基础 10 - 条件基础3 - 如果…否则…" },
  { name: "Python 基础 11 - 复习与巩固练习" },
  { name: "Python 基础 12 - 字符串类型 01" },
  { name: "Python 基础 13 - 字符串类型 02" },
  { name: "Python 基础 14 - 循环结构与字符串综合练习" },
  { name: "Python基础 15 - 循环结构与字符串综合练习2" },
  { name: "Python 基础16 - 列表类型 01" },
  { name: "Python 基础17 - 列表类型 02" },
  { name: "Python 基础18 - 循环基础 - for 循环结构" },
  { name: "Python 基础19 -循环基础-for in range" },
  { name: "Python 基础 20 - 乌龟画图基础操作" },
  { name: "Python 基础 21 - 乌龟画图 - 坐标" },
  { name: "Python 基础 23 - 异常处理" },
  { name: "Python 基础 24 - 时间操作 01" },
  { name: "Python 基础 25 - 时间操作 02" },
  { name: "闪烁的图案-跳动的心" },
  { name: "按钮控制-电子名片" },
  { name: "电子宠物" },
  { name: "启蒙体验课-吃披萨的精灵" },
  { name: "启蒙体验课-咬人的鳄鱼" },
  { name: "启蒙体验课-大鱼吃小鱼" },
  { name: "启蒙体验课-弹一弹" },
  { name: "排序算法入门" },
  { name: "图形排序算法" },
  { name: "查找算法入门 - 顺序查找" },
  { name: "坐标知识入门1" },
  { name: "坐标知识入门2" },
  { name: "编程第一课(b)" },
  { name: "顺序结构(b)" },
  { name: "玩转电子音乐(b)" },
  { name: "有声故事绘本(b)" },
  { name: "循环基础(b)" },
  { name: "摩斯电码(b)" },
  { name: "飞翔的小鸟" },
  { name: "创建游戏精灵" },
  { name: "控制精灵移动" },
  { name: "程序中的克隆" },
  { name: "最炫舞蹈动作" },
  { name: "小型烟花秀" },
  { name: "红包大作战" },
  { name: "键盘指法-基准键" },
  { name: "键盘指法-上排字母键" },
  { name: "键盘指法-下排字母键" },
  { name: "键盘指法-组合键" },
  { name: "体验课02：初探顺序结构与有声绘本" },
  { name: "T电子音乐" },
  { name: "圣诞节活动课" },
  { name: "可好玩乐产品培训" },
  { name: "体验课：初探顺序结构与电子音乐" },
  { name: "Python 基础 01" },
];

const dirFolder = '../../src/coursewares';
const folderDir = path.join(__dirname, "../../src/videos");
const replaceDir = path.join(__dirname, "../../src/replaced");

(async () => {
  async function getContent(course) {
    const htmlFile = path.join(__dirname, dirFolder, `${course.name}.html`);
    let content = await fs.readFileSync(htmlFile).toString();
    const videoReg = /<video.*?(?:>|\/>)/gi;
    const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    const urlReg = /[^\/]+$/;
    const hostNameReg = /^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)([^\/:?#]+)(?:[\/:?#]|$)([^\/:?#]+)(?:[\/:?#]|$)([^\/:?#]+)(?:[\/:?#]|$)/ig;
    const arr = content.match(videoReg);
    const srcArr = [];
    const length = arr ? arr.length : 0;

    for(let i = 0; i < length; i++) {
      let src = arr[i].match(srcReg);
      srcArr.push(src[1]);
    }
    // console.log(srcArr);

    let urls = [];
    for (let src of srcArr) {
      const filename = path.parse(src).base;
      // console.log(filename);
      // await fs.writeFileSync(path.join('dist', filename), await download(src));

      if (urls.includes(src)) {
      } else {
        urls.push(src);
      }
    
      // for (let url of urls) {
      //   console.log(url);
      //   const contents = content.replace(url, `https://videos.cdn.cocoet.cn/coursewares/${filename}`);
      //   fs.writeFileSync(path.join(replaceDir, `${course.name}.html`), contents, { flag: 'a' });
      // }
    }
    for (let url of urls) {
      const filename = path.parse(url).base;
      console.log(url);
      content = content.replace(url, `https://videos.cdn.cocoet.cn/coursewares/${filename}`);
    }
    fs.writeFileSync(path.join(replaceDir, `${course.name}.html`), content, { flag: 'w' });

    // console.log(content);


    // const renameUrls = srcArr.toString().match(urlReg);
    // const renameUrls = srcStr.match(hostNameReg);

    // const srcStr = srcArr.forEach(e => {
    //   console.log(e.match(hostNameReg));
    // });
    // console.log(srcStr);

    // fs.writeFileSync(path.join(folderDir, `videos.txt`), finalContent(srcArr), {flag: 'a'});
    // console.log('rename=======>', renameUrls);
    // return srcArr;
  }

  let cnt = 0, urls = [];

  for (let course of courses) {
    const srcArr = await getContent(course);

    // cnt += srcArr.length;
    
  //   for (let src of srcArr) {
  //     const filename = path.parse(src).base;
  //     await fs.writeFileSync(path.join('dist', filename), await download(src));
  //     if (urls.includes(src)) {
  //       console.log(src);
  //     } else {
  //       urls.push(src);
  //     }
  //   }

  //   const htmls = fs.readFileSync(path.join(__dirname, dirFolder, `x.html`)).toString();
  //   for (let url of urls) {
  //     const filename = path.parse(src).base;
  //     htmls.replace(url, `https://videos.cdn.cocoet.cn/coursewares/${filename}`);
  //   }
  //   fs.writeFileSync('', 'replaced/x.html', 'a')
  }
})();

function finalContent(srcArr) {
  return `${srcArr}` 
} 
// const allLinks = content.match(/\"(.+?\.mp4)+?\"/g);
// const allLinks = await content.match(/<video.*?(?:>|\/>)/gi);