
export const nEntities = action => action.payload.value
nEntities.actions = [ 'params:nEntities:set' ]
nEntities.defaultValue = 1


module.exports = {
    neighbourRepulsion  : require('./neighbourRepulsion'),
    targetAttraction    : require('./targetAttraction'),
    friendAttraction    : require('./friendAttraction'),

    nEntities,
}
