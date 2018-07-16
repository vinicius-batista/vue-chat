module.exports = {
  lintOnSave: true,

  chainWebpack: config => {
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .pre()
      .use('graphql-tag')
      .loader('graphql-tag/loader')
  },

  pwa: {
    name: 'Vue Chat'
  }
}
