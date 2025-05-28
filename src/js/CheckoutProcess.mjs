import {
  getLocalStorage
} from './utils.mjs';

export default class CheckoutProcess {
    constructor(cart, outputSelector) {
        this.cart = cart;
        this.outputSelector = outputSelector;
        this.calculateSubTotal();
    }

    calculateSubTotal() {
        let runningTotal = 0; // create variable to hold running total

        // loop through cart items and add FinalPrice to running total
        for (let i = 0; i < this.cart.length; i++) {
            runningTotal += this.cart[i].FinalPrice; //add price of item to running total
        }

        const subtotal = runningTotal.toFixed(2); // create variable to display total to the hundredths

        return this.subtotal = subtotal;
    }

    calculateItemSummary() {
        const summaryElement = document.querySelector(
            this.outputSelector + "#cartTotal"
        );
        const itemNumElement = document.querySelector(
            this.outputSelector + "#num-items"
        );
        itemNumElement.innerText = this.list.length;

        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = `$${this.itemTotal}`;;
    }

    totalCalculator() {
        this.tax = (this.itemTotal * 0.06);
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.tax) +
            parseFloat(this.shipping)
        )
        this.displayTotals();
    }

    displayTotals() {
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
        //console.log(order);

        try {
        const response = await services.checkout(order);
        console.log(response);
        } catch (err) {
        console.log(err);
        }
    }
}