module.exports = {
    type: 'web-module',
    npm: {
        esModules: true,
        umd: {
            global: 'WhenCondition',
            externals: {}
        }
    },
    karma: {
        frameworks: ['mocha', 'chai'],
        plugins: [
            require('karma-chai-plugins')
        ]
    }
}
