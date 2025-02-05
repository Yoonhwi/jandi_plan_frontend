export const formatPrice = (price) => {
  const number = parseInt(price);

  if (isNaN(number)) {
    return "";
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
