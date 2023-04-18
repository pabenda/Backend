class ProductManager {
    constructor() {
      this.products = [];
      this._priceEarning = 0;
      this._idCounter = 0;
    }
  
    getProducts() {
      let productsInfo = "";
      this.products.forEach((product) => {
        productsInfo += "Código: " + product.code + "\n";
        productsInfo += "Nombre: " + product.title + "\n";
        productsInfo += "Descripción: " + product.description + "\n";
        productsInfo += "Precio: " + product.price + "\n";
        productsInfo += "Ruta de imagen: " + product.thumbnail + "\n";
        productsInfo += "Existencia: " + product.stock + "\n";
        productsInfo += "Id: " + product.id + "\n";
        productsInfo += "--------\n";
      });
      return productsInfo;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios");
        return;
      }
      if (this.products.some((product) => product.code === code)) {
        console.log("El código ya existe");
        return;
      }
      const product = {
        title: title,
        description: description,
        price: price + price * 0.15 + this._priceEarning,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        id: ++this._idCounter,
      };
      this.products.push(product);
    }
  
    getProductById(id) {
      const product = this.products.find((product) => product.id === id);
      if (!product) {
        console.log("No encontrado");
      }
      return product;
    }
  
    updatePriceEarning(newPrice) {
      this._priceEarning = newPrice;
      console.log("El precio se ha actualizado");
    }
  
    updateStock(code, newStock) {
      let product_found = false;
      this.products.forEach((product) => {
        if (product.code === code) {
          product_found = true;
          product.stock = newStock;
          console.log("Existencia actualizada correctamente");
        }
      });
      if (!product_found) {
        console.log("El producto no existe");
      }
    }
  
    deleteProduct(code) {
      let product_found = false;
      this.products = this.products.filter((product) => {
        if (product.code === code) {
          product_found = true;
          console.log("Producto eliminado correctamente");
          return false;
        }
        return true;
      });
      if (!product_found) {
        console.log("El producto no existe");
      }
    }
  }
  
  const productManager = new ProductManager();
  productManager.addProduct("Camisa", "Camisa de vestir", 50, "ruta/de/imagen", "CAM001", 100);
  productManager.addProduct("Pantalón", "Jean", 80, "ruta/de/imagen", "PAN001", 50);
  productManager.updateStock("CAM001", 80);
  productManager.updateStock("PAN001", 50);
  productManager.deleteProduct("CAM001");
  productManager.updatePriceEarning(10);
  
  console.log(productManager.getProducts());
  console.log(productManager.getProductById(2));
