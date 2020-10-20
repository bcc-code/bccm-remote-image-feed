module.exports = ({env}) => ({
    upload: {
        provider: 'google-cloud-storage',
        providerOptions: {
            bucketName: 'brunstadtv-newsfeeds',
            publicFiles: true,
            uniform: false,
            basePath: 'strapi',
            serviceAccount: env('GCP_CREDENTIALS')      
        },
    },
})