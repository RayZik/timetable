var isPublic = typeof window != "undefined";

(function(global) {
    System.config({
        paths: {
            'npm:': (isPublic) ? '/' : '/node_modules/'
        },

        map: {
            app: 'client',

            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

            'dragula': 'npm:dragula',
            'underscore': 'npm:underscore',
            'jquery': 'npm:jquery/dist',
            'ng2-dragula': 'npm:ng2-dragula',
            'contra': 'npm:contra',
            'atoa': 'npm:atoa',
            'ticky': 'npm:ticky',
            'crossvent': 'npm:crossvent/src',
            'custom-event': 'npm:custom-event',

            'moment': 'npm:moment',
            'angular2-moment': 'npm:angular2-moment',

            'rxjs': 'npm:rxjs',
            'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
            'angular2-jwt': 'npm:angular2-jwt/angular2-jwt.js',
            'ng-semantic': 'npm:ng-semantic'

        },

        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'ng-semantic': {
                main: 'ng-semantic',
                defaultExtension: 'js'
            },
            'dragula': {
                main: 'dragula.js',
                defaultExtension: 'js'
            },
            'ng2-dragula': {
                defaultExtension: 'js'
            },
            'contra': {
                main: 'contra.js',
                defaultExtension: 'js'
            },
            'atoa': {
                main: 'atoa.js',
                defaultExtension: 'js'
            },
            'ticky': {
                main: 'ticky.js',
                defaultExtension: 'js'
            },
            'crossvent': {
                main: 'crossvent.js',
                defaultExtension: 'js'
            },
            'custom-event': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            'moment': {
                main: './moment.js',
                defaultExtension: 'js'
            },
            'angular2-moment': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'underscore': {
                main: './underscore.js',
                defaultExtension: 'js'
            },
            'jquery': {
                main: './jquery.min.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);