const sharp = require('sharp');
const os = require('os');
const fs = require('fs');
const util = require('util');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const { bytesToKbytes } = require("strapi-plugin-upload/utils/file");
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const writeFile = util.promisify(fs.writeFile);
const deleteFile = util.promisify(fs.unlink);

const getMetadatas = buffer =>
  sharp(buffer)
    .metadata()
    .catch(() => ({})); // ignore errors

const formatsToProccess = ['mp4', 'mov', 'webm', 'mkv'];
const canBeProcessed = async buffer => {
  const { format } = await getMetadatas(buffer);
  return format && formatsToProccess.includes(format);
};

// Renames the file extension.
const reName = (name, toName) =>
  name.split(".").slice(0, -1).join().concat(toName);

module.exports = {
    async generateVp9(file) {
        if (!canBeProcessed(file.buffer)) return;
        console.log(file);
        console.log(file.buffer);
        console.log("Encoding video to webm vp9");
        
        var tempFilePath = os.tmpdir() + file.name;
        await writeFile(tempFilePath, file.buffer);
        const newBuffer = await encodeToVp9(tempFilePath);
        await deleteFile(tempFilePath);

        return {
          name: `${reName(file.name, '_vp9.webm')}`,
          hash: `${file.hash}_vp9`,
          ext: '.webm',
          mime: file.mime,
          size: bytesToKbytes(Buffer.byteLength(newBuffer)),
          buffer: newBuffer,
          path: file.path ? file.path : null,
        };
    }
}

function encodeToVp9(filePath) {
  return new Promise((resolve) => {
    //const myReadableStream = bufferToStream(buffer);

    var command = ffmpeg(filePath)
    .withVideoCodec('libvpx-vp9')
    .toFormat('webm')
    .on('start', function(commandLine) {
      console.log('Spawned Ffmpeg with command: ' + commandLine);
    })
    .on('progress', function(progress) {
      console.log('Processing: ' + progress.percent + '% done');
    })
    .on('stderr', function(stderrLine) {
      console.log('Stderr output: ' + stderrLine);
    })
    .on('error', function(err) {
      console.log('An error occurred: ' + err.message);
    })
    .on('end', function() {
      console.log('Processing finished !');
    });
  
    var ffstream = command.pipe();
    var chunks = [];
    ffstream.on('data', function(chunk) {
      chunks.push(chunk);
      console.log('ffmpeg just wrote ' + chunk.length + ' bytes');
    }).on('end', function() {
      resolve(Buffer.concat(chunks));
    });
  });
}