export const parseData = (data: Object) => {
  const response = JSON.parse(data.toString())
  const parsedResponde = {
    symbol: response.symbol,
    value: Number(response.price),
  };
  return parsedResponde;
}
