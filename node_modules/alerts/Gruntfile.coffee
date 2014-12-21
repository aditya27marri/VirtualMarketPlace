bannerGlobal = """
  // alerts.js
  // version: <%= pkg.version %>  
  // author: Arturo Castillo Delgado  
  // license: MIT  
  // https://github.com/acstll/alerts

  (function () {\n\n
  """

bannerAMD = """
  // alerts.js
  // version: <%= pkg.version %>  
  // author: Arturo Castillo Delgado  
  // license: MIT  
  // https://github.com/acstll/alerts\n\n
  """

module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    concat:
      global:
        options:
          banner: bannerGlobal,
          footer: '\n\n}());',
          process: true
        src: './index.js'
        dest: 'dist/<%= pkg.name %>.js'
      amd:
        options:
          banner: bannerAMD,
          process: false
        src: 'dist/<%= pkg.name %>-amd-pre.js'
        dest: 'dist/<%= pkg.name %>-amd.js'

    amdwrap:
      main:
        src: './index.js'
        dest: 'dist/<%= pkg.name %>-amd-pre.js'

    clean: ['dist/<%= pkg.name %>-amd-pre.js']

    jshint:
      options:
        laxbreak: true
      index: './index.js',
      # tests: ['test/*.js']

  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-amd-wrap'

  grunt.registerTask 'lint', ['jshint']
  grunt.registerTask 'build', ['concat:global', 'amdwrap:main', 'concat:amd', 'clean']