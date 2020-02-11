
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'url',
                changeOrigin: true
            }
        }
    }
}