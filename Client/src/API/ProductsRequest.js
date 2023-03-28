import API from "./APIConfig";

export const GetProducts = () => API.get("/products");
export const UpdateProducts = ({ id, quatity }) =>
  API.patch(`/products/${id}`, { quatity: quatity });
