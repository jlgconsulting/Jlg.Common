﻿'use strict';
describe('jlg.common/sectionTitle tests:', function () {
    var scope,
    directiveElement,
    directiveIsolatedScope;

    beforeEach(function () {     
        module("jlg.common");
        module("alltemplates");
        
        inject(["$rootScope", "$compile", "globalSharedSrv", function ($rootScope, $compile, globalSharedSrv) {
            scope = $rootScope.$new();
            scope.apfSharedData = globalSharedSrv.sharedData;
            directiveElement = angular.element(
                "<section-title></section-title>");
            $compile(directiveElement)(scope);
            scope.$digest();
            directiveIsolatedScope = directiveElement.isolateScope();
        }]);
    });

    it("initialization", function () {
        var wentBack = false;
        var goBack = function() {
            wentBack = true;
        };

        scope.apfSharedData.sectionTitle.show = true;
        scope.apfSharedData.sectionTitle.title = "Custom title";
        scope.apfSharedData.sectionTitle.goBackCallback = goBack;
        scope.$digest();
        expect(directiveIsolatedScope.apfSharedData.sectionTitle.show).toBe(true);
        expect(directiveIsolatedScope.apfSharedData.sectionTitle.title).toBe("Custom title");
        expect(wentBack).toBe(false);
        directiveIsolatedScope.apfSharedData.sectionTitle.goBackCallback();
        expect(wentBack).toBe(true);
    });
});