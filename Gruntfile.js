'use strict';

module.exports = function (grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // load custom tasks
    grunt.task.loadTasks('./tasks');

    // Show elapsed time at the end
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        datetime: Date.now(),

        eslint: {
            options: {
                configFile: '.eslintrc'
            },
            src: {
                src: [
                    'Gruntfile.js'
                ]
            }
        },

        jsonlint: {
            configFiles: {
                src: [
                    'package.json',
                    '.eslintrc'
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'eslint',
        'jsonlint'
    ]);

};
