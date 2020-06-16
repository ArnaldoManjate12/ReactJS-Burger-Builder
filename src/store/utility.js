
export const updateObject = ( oldstate , updatedPropertes ) => {
    return {
        ...oldstate,
        ...updatedPropertes
    }
}