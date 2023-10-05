module.exports = {
  require: ['@babel/register'],
  timeout: '5000',
  spec: 'specs/**/*.js',
  exclude: 'specs/example*', //  '*/example*'
  file: 'project-config/auth-global-hook.js',
  reporter: 'mochawesome',
  reporterOption: [
    'json=false',
    'reportDir=MyReports',
    'reportFileName=UpdatedReport',
  ],
}
