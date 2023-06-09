
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
        _.assign(fileData, {
            provider: config.provider,
            width,
            height,
        });
        

        const response = await this.add(fileData, { user });
        console.log(response);
        const id = response.id;
        
        const backgroundTask = async () => {
            const vp9File = await generateVp9(fileData);
            if (vp9File) {
                await strapi.plugins.upload.provider.upload(vp9File);
                delete vp9File.buffer;
                let newFile = this.fetch({ id });
                _.set(newFile, 'formats.vp9', vp9File);
                this.update({ id }, newFile, { user });
            }
            delete fileData.buffer;
        }
        backgroundTask();

        return response;
    },

    

  async replace(id, { data, file }, { user } = {}) {
      throw new Error("Replace not supported");
  },
}