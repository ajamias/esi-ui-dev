(function () {
  'use strict';

  angular
    .module('horizon.dashboard.project.esi')
    .controller('horizon.dashboard.project.esi.EsiNodesTableController', controller);

  controller.$inject = [
    'horizon.dashboard.project.esi.esiNodesTableService',
    'horizon.dashboard.project.esi.nodeConfig',
    'horizon.dashboard.project.esi.nodeFilterFacets',
    'horizon.framework.widgets.toast.service',
    'horizon.framework.widgets.modal-wait-spinner.service',
  ];

  var POWER_ON_TRANSITIONS = [
    {
      state: 'power off',
      buttonDisplay: 'Power Off'
    },
    {
      state: 'soft power off',
      buttonDisplay: 'Soft Power Off'
    },
  ];
  var POWER_OFF_TRANSITIONS = [
    {
      state: 'power on',
      buttonDisplay: 'Power On'
    }
  ];

  function controller(nodesService, config, filterFacets, toastService, spinnerService) {
    var ctrl = this;

    ctrl.config = config;
    ctrl.filterFacets = filterFacets;
    ctrl.nodesDisplay = [];
    ctrl.nodesSrc = [];

    ctrl.getPowerTransitions = getPowerTransitions;
    ctrl.setPowerState = setPowerState;

    ////////////////

    spinnerService.showModalSpinner('Getting nodes');
    init();

    function init() {
      return nodesService.nodeList()
      .then(function(response) {
        ctrl.nodesSrc = response.data.nodes;
        ctrl.nodesDisplay = ctrl.nodesSrc;
        spinnerService.hideModalSpinner();
      })
      .catch(function(response) {
        toastService.add('error', 'Unable to retrieve ESI nodes. ' + (response.data ? response.data : ''));
        spinnerService.hideModalSpinner();
      })
    }

    function getPowerTransitions(node) {
      if (node.power_state === 'power on')
        return POWER_ON_TRANSITIONS;

      return POWER_OFF_TRANSITIONS;
    }

    function setPowerState(nodes, target) {
      angular.forEach(nodes, function(node) {
        node.target_power_state = target;

        nodesService.setPowerState(node, target)
        .then(function(response) {
          node.power_state = response.data.power_state;
          node.target_power_state = null;
          console.log(response)
        })
        .catch(function(response) {
          node.target_power_state = null;
          toastService.add('error', 'Unable to set power state. ' + (response.data ? response.data : ''))
        })
      })
    }
  }

})();