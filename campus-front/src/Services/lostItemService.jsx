import axios from "axios";

const LOST_URL='http://localhost:9999/lost-found/lostitem';
const SINGLE_LOST_URL='http://localhost:9999/lost-found/lost';
const ID_GEN_URL = "http://localhost:9999/lost-found/lostid-gen";
const FUZY_URL='http://localhost:9999/lost-found/fuzzy';


export const getAllLostItems = () => {
  return axios.get(LOST_URL);
};

export const lostItemSubmission = (lostItem) => {
  return axios.post(LOST_URL, lostItem);
};

export const getLostItemById = (id) => {
  return axios.get(LOST_URL+'/'+id);
};


export const deleteLostItemById = (id) => {
  return axios.delete(LOST_URL+'/'+id);
};

export const lostItemListByUser=()=>{
  return axios.get(SINGLE_LOST_URL);
}

export const lostItemIdGenerator = () => {
  return axios.get(ID_GEN_URL);
  
};

export const fuzzySearching=(keyword)=> {
  return axios.get(FUZY_URL+'/'+keyword);
};