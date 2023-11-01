import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	name: string;
	age: number;
}

let user = createSlice({
  name: "user",
  initialState: { name: "서현교", age: 25 } as UserState,
  reducers: {
    changeName(state) {
      state.name = "SEO";
    },

    increase(state, action: PayloadAction<number>) {
      state.age += action.payload;
    },
  },
});

export let { changeName, increase } = user.actions;

interface CartItem {
	id: number;
	imgurl: string;
	name: string;
	count: number;
  ogprice: number;
	price: number;
}

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, imgurl: "../img/product1.jpg", name: "갸또 쇼콜라", count: 1, ogprice: 38000 },
    { id: 1, imgurl: "../img/product2.jpg", name: "쉭쎄", count: 1, ogprice: 29000 },
    { id: 2, imgurl: "../img/product3.jpg", name: "초코 구운과자 묶음 (4+1)", count: 2, ogprice: 9200, },
  ] as CartItem[],
  reducers: {
    addCount(state, action: PayloadAction<number>) {
      let num = state.findIndex((a) => {
        return a.id === action.payload;
      });
      console.log(num);
      state[num].count++;
      
    },
    decreaseCount(state, action: PayloadAction<number>) {
      let num = state.findIndex((a) => {
        return a.id === action.payload;
      });
      console.log(num);
      if (state[num].count > 1) {
        state[num].count--;
      } else if (state[num].count === 1) {
        alert("최소 주문수량은 1개 입니다.");
      }
    },
    addItem(state, action: PayloadAction<CartItem>) {
      let num = state.findIndex((a) => a.id === action.payload.id);
      if (num !== -1) {
        state[num].count++;
      } else {
        state.push(action.payload);
      }
    },

    deleteItem(state, action: PayloadAction<number>) {
      let num = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state.splice(num, 1);
    },
    sortName(state, action) {
      state.sort((a, b) => (a.name > b.name ? 1 : -1));
    },
  },
});


export const {  addCount,  decreaseCount,  addItem,  deleteItem,  sortName } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
