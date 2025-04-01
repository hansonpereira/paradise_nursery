// venueSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const plantSlice = createSlice({
    name: "plant",
    initialState: [
        {
            category: "Air Purifying Plants",
            name: "Aloe Vera",
            cost: 15,
            img: "https://backgardener.com/wp-content/uploads/2025/01/cropped-backgardener_logo_min.jpg",
            quantity: 0,
            info: "Aloe Vera is a succulent plant known for its medicinal and skincare benefits."

        },
        {
            category: "Air Purifying Plants",
            name: "Snake Plant",
            cost: 20,
            img: "https://backgardener.com/wp-content/uploads/2025/01/cropped-backgardener_logo_min.jpg",
            quantity: 0,
            info: "The Snake Plant is a hardy indoor plant that improves air quality.",
            sale: true
        },
        {
            category: "Air Purifying Plants",
            name: "Peace Lily",
            cost: 25,
            img: "https://backgardener.com/wp-content/uploads/2025/01/cropped-backgardener_logo_min.jpg",
            quantity: 0,
            info: "Peace Lily is a beautiful flowering plant that purifies indoor air.",
            sale: true
        },
        {
            category: "Air Purifying Plants",
            name: "Spider Plant",
            cost: 12,
            img: "https://backgardener.com/wp-content/uploads/2025/01/cropped-backgardener_logo_min.jpg",
            quantity: 0,
            info: "Spider Plant is an easy-to-care-for houseplant known for its arching leaves.",
            sale: true
        },
        {
            category: "Aromatic Fragment Plant",
            name: "Jade Plant",
            cost: 18,
            img: "https://backgardener.com/wp-content/uploads/2025/01/cropped-backgardener_logo_min.jpg",
            quantity: 0,
            info: "Jade Plant is a popular succulent that symbolizes good luck.",
            sale: false
        },
        {
            category: "Aromatic Fragment Plant",
            name: "Areca Palm",
            cost: 30,
            img: "https://backgardener.com/wp-content/uploads/2025/01/cropped-backgardener_logo_min.jpg",
            quantity: 0,
            info: "Areca Palm is a tropical plant that enhances indoor décor.",
            sale: false
        },
        {
            category: "Aromatic Fragment Plant",
            name: "Rubber Plant",
            cost: 28,
            img: "https://backgardener.com/wp-content/uploads/2025/01/cropped-backgardener_logo_min.jpg",
            quantity: 0,
            info: "Rubber Plant has large, glossy leaves and is an excellent air purifier.",
            sale: true
        },
        {
            category: "Aromatic Fragment Plant",
            name: "Money Plant",
            cost: 10,
            img: "https://backgardener.com/wp-content/uploads/2025/01/cropped-backgardener_logo_min.jpg",
            quantity: 0,
            info: "Money Plant is an attractive vine that is believed to bring prosperity.",
            sale: true
        },
        {
            category: "Aromatic Fragment Plant",
            name: "Fern",
            cost: 15,
            img: "https://backgardener.com/wp-content/uploads/2025/01/cropped-backgardener_logo_min.jpg",
            quantity: 0,
            info: "Ferns are lush green plants that thrive in humid environments.",
            sale: false

        },
        {
            category: "Aromatic Fragment Plant",
            name: "Bamboo Palm",
            cost: 22,
            img: "https://backgardener.com/wp-content/uploads/2025/01/cropped-backgardener_logo_min.jpg",
            quantity: 0,
            info: "Bamboo Palm is a tropical plant that adds a touch of tropical elegance.",
            sale: false


        },

    ],
    reducers: {

        incrementQuantity: (state, action) => {
            const { payload: index } = action;
            if (state[index]) {
                state[index].quantity++;
            }
        },
        decrementQuantity: (state, action) => {
            const { payload: index } = action;
            if (state[index] && state[index].quantity > 0) {
                state[index].quantity--;
            }
        },
    },
});

export const { incrementQuantity, decrementQuantity } = plantSlice.actions;

export default plantSlice.reducer;
