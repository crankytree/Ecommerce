let initialState = [];

if(typeof window !== undefined){
  const cartExist = localStorage.getItem("cart");

  

  if(cartExist){
      initialState = JSON.parse(cartExist);
  }
  else{
    initialState = [];
  }
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;


    default: return state;
  }
};
