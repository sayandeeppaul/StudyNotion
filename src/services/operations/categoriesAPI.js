// import { apiConnector } from "../apiConnector";
// import { categories } from "../apis";

// export const getAllCategories = async () => {
//   try {
//     // console.log("---------------->")
//     let result;
//     const res = await apiConnector("GET", categories.CATEGORIES_API);
//     console.log("--------------->", res.data);
//     if (!res?.data?.success) {
//       throw new Error("Could not fetch Categories inside try block");
//     }
//     result = res?.data?.data;
//   } catch (error) {
//     console.log("Could not fetch Categories inside category API");
//   }
// };
