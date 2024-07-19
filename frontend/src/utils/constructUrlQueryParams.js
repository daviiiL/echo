const constructUrlQueryParams = (arr, paramName) => {
  arr = arr.map((e) => `${paramName}=${e}`);
  return `?${arr.join("&")}`;
};

export default constructUrlQueryParams;
