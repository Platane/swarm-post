
const nEntities = () =>
    200

module.exports = {
    neighbourRepulsion  : require('./neighbourRepulsion'),
    targetAttraction    : require('./targetAttraction'),
    friendAttraction    : require('./friendAttraction'),

    nEntities,
}
