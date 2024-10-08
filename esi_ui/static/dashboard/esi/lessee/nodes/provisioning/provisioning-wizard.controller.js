(function () {
  'use strict';

  angular
    .module('horizon.dashboard.esi.lessee.nodes.provisioning')
    .controller('ProvisioningWizardController', ProvisioningWizardController);

  ProvisioningWizardController.$inject = [
    '$scope',
    'provisioningModel',
    'horizon.dashboard.esi.lessee.nodes.provisioning.workflow',
  ];

  function ProvisioningWizardController($scope, provisioningModel, provisioningWorkflow) {
    $scope.workflow = provisioningWorkflow;
    $scope.model = provisioningModel;
    $scope.submit = $scope.model.submit;

    $scope.model.initialize();
  }

})();