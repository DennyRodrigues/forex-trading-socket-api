export const parseData = (data: Object) => {
  const response = JSON.parse(data.toString()); // Shows the original stringified version
  // JSON.parse not working, Get mid value using string split
  return Number(response.price);
}
