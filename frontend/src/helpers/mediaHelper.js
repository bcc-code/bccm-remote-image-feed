const videoExtensions = ["mp4", "mov", "webm", "mkv"];

export const isVideo = (media) => !!videoExtensions.find(e => media.ext && media.ext.toLowerCase().includes(e));

export const hasVp9 = (media) => media.formats && media.formats.vp9;