import { filterBy, isArray } from '@shell/utils/array';

export const state = function() {
  return {
    show:                false,
    resources:           [],
    elem:                null,
    event:               null,
    showPromptRemove:    false,
    showPromptRestore:   false,
    showModal:           false,
    performCallbackData: undefined,
    toRemove:            [],
    toRestore:           [],
    modalData:           {},
  };
};

export const getters = {
  showing:             (state) => state.show,
  elem:                (state) => state.elem,
  event:               (state) => state.event,
  resources:           (state) => state.resources,
  performCallbackData: (state) => state.performCallbackData,
  optionsArray(state) {
    let selected = state.resources;

    if ( !selected ) {
      return [];
    }

    if ( !isArray(selected) ) {
      selected = [];
    }

    const map = {};

    for ( const node of selected ) {
      if (node?.availableActions) {
        for ( const act of node.availableActions ) {
          _add(map, act);
        }
      }
    }

    const out = _filter(map);

    return [...out];
  },
  options(_state, getters) {
    return { ...getters.optionsArray };
  },

};

export const mutations = {
  show(state, { resources, elem, event }) {
    if ( !isArray(resources) ) {
      resources = [resources];
    }

    state.resources = resources;
    state.elem = elem;
    state.event = event;
    state.show = true;
  },

  hide(state) {
    state.show = false;
    state.resources = null;
    state.elem = null;
  },

  togglePromptRemove(state, resources) {
    if (!resources) {
      state.showPromptRemove = false;
      resources = [];
    } else {
      state.showPromptRemove = !state.showPromptRemove;
      if (!isArray(resources)) {
        resources = [resources];
      }
    }
    state.toRemove = resources;
  },

  togglePromptRestore(state, resources) {
    if (!resources) {
      state.showPromptRestore = false;
      resources = [];
    } else {
      state.showPromptRestore = !state.showPromptRestore;
      if (!isArray(resources)) {
        resources = [resources];
      }
    }
    state.toRestore = resources;
  },

  togglePromptModal(state, data) {
    if (!data) {
      // Clearing the resources also hides the prompt
      state.showModal = false;
    } else if (data.performCallback) {
      state.performCallbackData = data;
      state.showModal = false;
    } else {
      state.showModal = true;
    }

    state.modalData = data;
  },

  clearCallbackData(state) {
    state.performCallbackData = undefined;
  },

  SET_RESOURCE(state, resources) {
    state.resources = !isArray(resources) ? [resources] : resources;
  }
};

export const actions = {
  execute({ state }, { action, args, opts }) {
    return _execute(state.resources, action, args, opts);
  },
  setResource({ commit }, resource) {
    commit('SET_RESOURCE', resource);
  },
  clearCallbackData({ commit }) {
    commit('clearCallbackData');
  }
};

// -----------------------------

let anon = 0;

function _add(map, act, incrementCounts = true) {
  let id = act.action;

  if ( !id ) {
    id = `anon${ anon }`;
    anon++;
  }

  let obj = map[id];

  if ( !obj ) {
    obj = Object.assign({}, act);
    map[id] = obj;
    obj.allEnabled = false;
  }

  if ( act.enabled === false ) {
    obj.allEnabled = false;
  } else {
    obj.anyEnabled = true;
  }

  if ( incrementCounts ) {
    obj.available = (obj.available || 0) + (act.enabled === false ? 0 : 1 );
    obj.total = (obj.total || 0) + 1;
  }

  return obj;
}

function _filter(map, disableAll = false) {
  const out = filterBy(Object.values(map), 'anyEnabled', true);

  for ( const act of out ) {
    if ( disableAll ) {
      act.enabled = false;
    } else {
      act.enabled = ( act.available >= act.total );
    }
  }

  return out;
}

function _execute(resources, action, args, opts = {}) {
  args = args || [];
  if ( resources.length > 1 && action.bulkAction && !opts.alt ) {
    const fn = resources[0][action.bulkAction];

    if ( fn ) {
      return fn.call(resources[0], resources, ...args);
    }
  }

  const promises = [];

  for ( const resource of resources ) {
    let fn;

    if (opts.alt && action.altAction) {
      fn = resource[action.altAction];
    } else {
      fn = resource[action.action];
    }

    if ( fn ) {
      promises.push(fn.apply(resource, args));
    }
  }

  return Promise.all(promises);
}
