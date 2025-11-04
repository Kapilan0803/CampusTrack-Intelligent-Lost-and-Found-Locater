import axios from "axios";

const FOUND_URL='http://localhost:9999/lost-found/founditem';
const SINGLE_FOUND_URL='http://localhost:9999/lost-found/found';
const ID_GEN_URL = "http://localhost:9999/lost-found/foundid-gen";


export const getAllFoundItems = () => {
  return axios.get(FOUND_URL);
};

export const foundItemSubmission = (foundItem) => {
  return axios.put(FOUND_URL, foundItem);
};

export const getFoundItemById = (id) => {
  return axios.get(FOUND_URL+'/'+id);
};


export const deleteFoundItemById = (id) => {
  return axios.delete(FOUND_URL+'/'+id);
};

export const foundItemListByUser=()=>{
  return axios.get(SINGLE_FOUND_URL);
}

export const foundItemIdGenerator = () => {
  return axios.get(ID_GEN_URL);
  
};