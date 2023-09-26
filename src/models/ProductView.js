// import React, { useState, useEffect } from 'react';
// import { Select, Button } from 'antd';
// import { addToCart } from '../cartHandling/actions';
// import { useDispatch, useSelector } from 'react-redux';
// import Cookies from 'js-cookie';
// const { Option } = Select;


// const cookieValue = JSON.parse(Cookies.get('temp_cart_item'));
// //   if (cookieValue) {
// //     console.log(cookieValue);
// //   }
// //   else {
// //   console.log("No ProductDetail");
// //     }

// const ProductDetail = ({variations, values }) => {
//     const [selectedVariations, setSelectedVariations] = useState({});
//     const [selectedValues, setSelectedValues] = useState({});
  
//     const dispatch = useDispatch();
//     const cart = useSelector(state => state.cart);

//     const handleAddToCart = () => {
//       const selectedProduct = {};
//       for (const variation in selectedVariations) {
//         selectedProduct[variation] = selectedVariations[variation];
//         selectedProduct[selectedValues[variation]] = true;
//       }
//       dispatch(addToCart(selectedProduct));
//     };
//     console.log(cookieValue)
//     const product = cookieValue;
//     console.log(product);
//     console.log(product.name);
  
//     return (
//       <>
//         {/* <h1>{product.product_name}</h1>
//         <h2>LOL : ${product.product_name}</h2> */}
//         {/* <h1>{cookieValue}</h1> */}
//         <h2>{product.name}</h2>
//         {variations.map(variation => (
//           <div key={variation}>
//             <span>{variation}: </span>
//             <Select style={{ width: 200 }} value={selectedVariations[variation]} onChange={value => setSelectedVariations({ ...selectedVariations, [variation]: value })}>
//               {values[variation].map(value => (
//                 <Option key={value} value={value}>{value}</Option>
//               ))}
//             </Select>
//           </div>
//         ))}
//         <Button type="primary" onClick={handleAddToCart}>Add to Cart</Button>
//       </>
//     );
//   };
  





// const VA = () => {
  

//   const getVariations = async (categoryId) => {
//     try {
//       console.log("getVariations");
//       const response = await fetch(`http://localhost:8080/api/variations/${categoryId}`);
//       console.log(response);
//       return response.json();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const [loading, setLoading] = useState(true);
//   const [variations, setVariations] = useState(null);
//   const [values, setValues] = useState(null);

//   useEffect(() => {
//     const fetchVariations = async () => {
//       try {
//         const response = await getVariations(3);
//         setVariations(Object.keys(response.variations));
//         setValues(response.variations);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchVariations();
//   }, []);


//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <ProductDetail variations={variations} values={values} />
//   );
// };

// export default VA;

  