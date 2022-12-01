const getAssetsUrl = (imageUrl) => {
    // 参数一: 相对路径
    // 参数二: 当前路径的URL
    return new URL(`../assets/img/${imageUrl}`, import.meta.url).href
}


export {
    getAssetsUrl
}