(function () {
    'use strict';
  
    angular
      .module('horizon.dashboard.esi.delete-leases')
      .factory(
        'horizon.dashboard.esi.delete-leases.modal.service',
        DeleteLeasesModalService
      );
  
    DeleteLeasesModalService.$inject = [
      '$uibModal',
      'horizon.dashboard.esi.delete-leases.modal-spec'
    ];
  
    function DeleteLeasesModalService($uibModal, modalSpec) {
      var service = {
        open: open
      };
  
      return service;
  
      function open(launchContext) {
        var localSpec = {
          resolve: {
            launchContext: function () {
              return launchContext;
            }
          }
        };
  
        angular.extend(localSpec, modalSpec);
  
        return $uibModal.open(localSpec).result;
      }
    }
  
  })();