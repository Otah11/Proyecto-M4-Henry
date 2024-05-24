import { Injectable } from "@nestjs/common";
import { Product } from "./products.interface";

@Injectable()
export class ProductsRepository {
    private products = [{
        id: 1,
        name: "Iphone 15",
        description: "The best smartphone in the world",
        price: 199.99,
        stock: 12,
        category: "smartphone",
        imgUrl: "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
    },
    {
        id: 2,
        name: "Samsung Galaxy S23",
        description: "The best smartphone in the world",
        price: 150.0,
        stock: 12,
        category: "smartphone",
        imgUrl: "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
    },
    {
        id: 3,
        name: "Motorola Edge 40",
        description: "The best smartphone in the world",
        price: 179.89,
        stock: 12,
        category: "smartphone",
        imgUrl: "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
    },
    {
        id: 4,
        name: "Samsung Odyssey G9",
        description: "The best monitor in the world",
        price: 299.99,
        stock: 12,
        category: "monitor",
        imgUrl: "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
    },
    {
        id: 5,
        name: "LG UltraGear",
        description: "The best monitor in the world",
        price: 199.99,
        stock: 12,
        category: "monitor",
        imgUrl: "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
    },
    {
        id: 6,
        name: "Acer Predator",
        description: "The best monitor in the world",
        price: 150.0,
        stock: 12,
        category: "monitor",
        imgUrl: "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
    },
    {
        id: 7,
        name: "Razer BlackWidow V3",
        description: "The best keyboard in the world",
        price: 99.99,
        stock: 12,
        category: "keyboard",
        imgUrl: "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
    },
    {
        id: 8,
        name: "Corsair K70",
        description: "The best keyboard in the world",
        price: 79.99,
        stock: 12,
        category: "keyboard",
        imgUrl: "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
    },
    {
        id: 9,
        name: "Logitech G Pro",
        description: "The best keyboard in the world",
        price: 59.99,
        stock: 12,
        category: "keyboard",
        imgUrl: "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
    },
    {
        id: 10,
        name: "Razer Viper",
        description: "The best mouse in the world",
        price: 49.99,
        stock: 12,
        category: "mouse",
        imgUrl: "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
    },
    {
        id: 11,
        name: "Logitech G502 Pro",
        description: "The best mouse in the world",
        price: 39.99,
        stock: 12,
        category: "mouse",
        imgUrl: "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
    },
    {
        id: 12,
        name: "SteelSeries Rival 3",
        description: "The best mouse in the world",
        price: 29.99,
        stock: 12,
        category: "mouse",
        imgUrl: "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
    }

    ];
    async getProducts() : Promise<Product[]> {
        return this.products;
        
    }   
    
    async getProductsById(id: number): Promise<Product> {
        return this.products.find(product => product.id === id);
    }
    async createProduct(product: Omit<Product, "id">): Promise<number> {
        const id = this.products[this.products.length -1].id + 1;
        this.products.push({id, ...product});
        return id;
    }

    async updateProduct(id: number, product: Partial<Product>) :Promise<number> {
        const i = this.products.findIndex(product => product.id === id);
        this.products[i] = { ...this.products[i], ...product };
        return id;
    }
    async deleteProduct(id: number): Promise<number> {
        const i = this.products.findIndex(product => product.id === id);
        this.products.splice(i, 1);
        return id;
    }
}