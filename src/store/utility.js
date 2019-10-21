export const updateObject = (oldObj, updProps) => {
    return {
        ...oldObj,
        ...updProps,
    }
}