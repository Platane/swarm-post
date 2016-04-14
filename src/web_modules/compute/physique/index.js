
export const friendAttraction = ( d0, fatness, friendlyness, revulsion ) =>
    d => {
        d = Math.max( 2, d )
        return - revulsion / ( d * d ) + friendlyness * Math.exp( -( d - d0 )*( d - d0 ) / ( fatness * fatness ) )
    }
export const targetAttraction = ( k ) =>
    d => k

export const neighbourRepulsion = ( k ) =>
    d =>  {
        d = Math.max( 2, d )
        return - k / Math.max( 1, ( d * d ) )
    }
