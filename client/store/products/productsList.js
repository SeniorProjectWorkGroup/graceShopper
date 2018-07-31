import axios from 'axios'
import {setDisplayedProducts} from './displayedProducts'

// ===========  ACTION TYPES ============
const GET_PRODUCTS = 'GET_PRODUCTS'
const GOT_PRODUCTS_WITH_PAGINATION = 'GOT_PRODUCTS_WITH_PAGINATION'
const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY'
const ADD_PRODUCT = 'POST_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

// ========== ACTION CREATORS ================
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const gotProductsWithPagination = products => ({
  type: GOT_PRODUCTS_WITH_PAGINATION,
  products
  // limit,
  // offset
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

const getProductsByCategory = products => ({
  type: GET_PRODUCTS_BY_CATEGORY,
  products
})

const deleteProduct = deletedId => ({
  type: DELETE_PRODUCT,
  deletedId
})

const editProduct = (editedId, updatedProduct) => ({
  type: EDIT_PRODUCT,
  editedId,
  updatedProduct
})

// =========== THUNK CREATORS ===========
export const fetchProducts = () => {
  return async dispatch => {
    const {data: products} = await axios.get('/api/products')
    dispatch(getProducts(products))
  }
}

export const fetchProductsAndDisplay = () => {
  return async dispatch => {
    const {data: products} = await axios.get('/api/products')
    dispatch(getProducts(products))
    // Display all the products
    dispatch(setDisplayedProducts(products))
  }
}

// CHECK FOR CORRECT APPROACH
export const fetchProductsByCategory = categoryId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products?categoryId=${categoryId}`)
    dispatch(getProductsByCategory(data))
  }
}

export const fetchProductsWithPagination = (allProducts, limit, offset) => {
  return async dispatch => {
    // const {data: products} = await axios.get(
    //   `/api/products?limit=${limit}&offset=${offset}`
    // )
    console.log('in fetchProductsWithPagination thunk. allProducts.length:' + allProducts.length)
    let productsToDisplay;
    // Check if can just display the products. If there's not enough, fetch them
    if (allProducts.length < limit + offset) {
      console.log('======== DOING A FETCH OF ALL PRODUCTS==========')
      const {data: products} = await axios.get(`/api/products`)
      dispatch(gotProductsWithPagination(products))
      productsToDisplay = products.slice(offset, offset + limit)
    } else {
      productsToDisplay = allProducts.slice(offset, offset + limit)
    }

    // Display the paginated products
    dispatch(setDisplayedProducts(productsToDisplay))
  }
}

export const postProducts = product => {
  return async dispatch => {
    const {data} = await axios.post('/api/products', product)
    dispatch(addProduct(data))
  }
}

export const putProductById = (productId, productUpdated) => {
  return async dispatch => {
    console.log('ID', productId)
    console.log('Prodddd', productUpdated)
    const {data} = await axios.put(`/api/products/${productId}`, productUpdated)
    dispatch(editProduct(data))
  }
}

export const destroy = productId => {
  return async dispatch => {
    await axios.delete(`/api/products/${productId}`)
    dispatch(deleteProduct(productId))
  }
}

const mergeArrays = (arr1, arr2, comparator) => {
  // Copy all the elems of arr1 first
  const newArr = [...arr1]
  // For each elem of arr2, check if need to update elem from newArr.
  // If not, add to the end
  arr2.forEach(arr2Elem => {
    // Compare by ids, not reference
    const idxFound = arr1.findIndex(arr1Elem => {
      return comparator(arr1Elem, arr2Elem)
    })
    // If found, update it with arr2's elem
    if (idxFound !== -1) {
      //newArr.splice(idxFound, 1, arr2Elem)
      Object.assign(newArr[idxFound], arr2Elem)
    } else {
      // Else add to the end
      newArr.push(arr2Elem)
    }
  })
  return newArr
}

const productListReducer = (productListState = [], action) => {
  // console.log('in productlist reducer. productliststate:', productListState, 'action:', action)
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case GET_PRODUCTS_BY_CATEGORY:
      return action.products
    case GOT_PRODUCTS_WITH_PAGINATION: {
      // Merge the new set of products with the current list, maintaining order
      // and updating any duplicates
      return mergeArrays(
        productListState,
        action.products,
        (obj1, obj2) => obj1.id === obj2.id
      )
      // return action.products
    }
    case ADD_PRODUCT:
      return [...productListState, action.product]
    case DELETE_PRODUCT: {
      const filteredList = productListState.filter(product => {
        return product.id !== action.deletedId
      })
      return filteredList
    }
    case EDIT_PRODUCT: {
      const updatedList = productListState.map(product => {
        if (product.id !== action.editedId) return action.updatedProduct
      })
      return updatedList
    }
    default:
      return productListState
  }
}

export default productListReducer
