
export const nEntities = action => action.payload.value
nEntities.actions = [ 'params:nEntities:set' ]
nEntities.defaultValue = 1

export const inertia = action => action.payload.value
inertia.actions = [ 'params:inertia:set' ]
inertia.defaultValue = 1


module.exports = {
    neighbourRepulsion  : require('./neighbourRepulsion'),
    targetAttraction    : require('./targetAttraction'),
    friendAttraction    : require('./friendAttraction'),

    nEntities,
    inertia,
}
