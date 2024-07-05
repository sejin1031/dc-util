export const toQueryString = (object) => {
  return Object.keys(object).map(key => {
    return `${key}=${object[key]}`;
  }).join("&")
}