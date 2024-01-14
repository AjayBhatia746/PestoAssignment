const products = [{id:"uuid1",name:"laptop",sellerId:"uuID2",price:"22.30",currency:"rupess",version:1}];
let version = 0; // Track the version number for optimistic locking

const getAllProducts = () => {
  return [200,{products:products}];
};

const getProductById = (productId) => {
  return [200,{product: products.find((p) => p.id === productId)}]
};

const createProduct = (id,name, price,sellerId) => {
  //here id will be unique generated at user end
  for(let i = 0; i < products.length;i++){
    if(products[i].id == id){
      throw Error("product with this id already exist");
    }
  } 
  const newProduct = { id, name, price, version: ++version, sellerId};
  products.push(newProduct);
  return [201,{"message":"Product has been created successfully","product":newProduct}];
};

const updateProduct = (productId, name, price,currency ,clientVersion,sellerId) => {
  const existingProductIndex = products.findIndex((p) => p.id === productId);

  if (existingProductIndex !== -1) {
    const existingProduct = products[existingProductIndex];

    // Check if the client version matches the server version
    if (clientVersion === existingProduct.version) {
      // Update the product and increment the version
      existingProduct.name = name;
      existingProduct.price = price;
      existingProduct.currency = currency
      existingProduct.currency = sellerId
      existingProduct.version++;

      return [200,{"message":"Product has been updated sucessfully"}];
    } else {
      // Version mismatch, handle the conflict (throw an error, prompt user, etc.)
      throw new Error('Conflict: Product has been modified by another user.');
    }
  }

  return null;
};

const deleteProduct = (productId) => {
  const deletedProductIndex = products.findIndex((p) => p.id === productId);

  if (deletedProductIndex !== -1) {
    products.splice(deletedProductIndex, 1)[0];
    return [200,{"message":"Product has been deleted successfully",products}];
  }
  throw Error("product id doesn't exist in DB");
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
