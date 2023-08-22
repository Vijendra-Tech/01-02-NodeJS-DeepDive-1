/** Forking and Uploading Stream  */

const { createServer } = require("http");
const { stat, createReadStream, createWriteStream } = require("fs");
const { promisify } = require("util");
const PORT = 81;

const fileName = "./Adv-nodes/stream/files/01.mp4";
const fileInfo = promisify(stat);

const responseWithVideo = async (req, res) => {
  const { size } = await fileInfo(fileName);
  const range = req.headers.range;
  if (range) {
    let [start, end] = range.replace(/bytes=/, "").split("-");
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "btyes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    });
    createReadStream(fileName, { start, end }).pipe(res);
  } else {
    res.writeHead(206, {
      "Content-Length": size,
      "Content-Type": "video/mp4",
    });
    createReadStream(fileName).pipe(res);
  }
};

createServer((req, res) => {
  if (req.method === "POST") {
    req.pipe(res);
    req.pipe(process.stdout);
    req.pipe(createWriteStream("./upload-file"));
  } else if (req.url === "/video") {
    responseWithVideo(req, res);
  } else {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(`
            <form enctype "multipart/form-data" method ="POST" action ="/">
            <input type  ="file"  name ="upload-file"/>
            <button>Upload File</button>
            </form>
        `);
  }
}).listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
