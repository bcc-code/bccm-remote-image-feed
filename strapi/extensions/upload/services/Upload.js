
const _ = require('lodash');
module.exports = {
    async uploadFileAndPersist(fileData, { user } = {}) {
        const config = strapi.plugins.upload.config;

        const {
            getDimensions,
            generateThumbnail,
            generateResponsiveFormats,
        } = strapi.plugins.upload.services['image-manipulation'];

        const {
            generateVp9,
        } = strapi.plugins.upload.services['video-manipulation'];
        
        await strapi.plugins.upload.provider.upload(fileData);

        const vp9File = await generateVp9(fileData);
        if (vp9File) {
            await strapi.plugins.upload.provider.upload(vp9File);
            delete vp9File.buffer;
            _.set(fileData, 'formats.vp9', vp9File);
        }

        const thumbnailFile = await generateThumbnail(fileData);
        if (thumbnailFile) {
            await strapi.plugins.upload.provider.upload(thumbnailFile);
            delete thumbnailFile.buffer;
            _.set(fileData, 'formats.thumbnail', thumbnailFile);
        }

        const formats = await generateResponsiveFormats(fileData);
        if (Array.isArray(formats) && formats.length > 0) {
            for (const format of formats) {
                if (!format) continue;

                const { key, file } = format;

                await strapi.plugins.upload.provider.upload(file);
                delete file.buffer;

                _.set(fileData, ['formats', key], file);
            }
        }

        const { width, height } = await getDimensions(fileData.buffer);

        delete fileData.buffer;

        _.assign(fileData, {
            provider: config.provider,
            width,
            height,
        });

        return this.add(fileData, { user });
    },
}