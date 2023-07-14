export const filterItems = (
    items: ProductItem[],
    brand?: number,
    quality?: number,
    size?: number,
  ) => {
    let filteredItems = items.slice(); //clone
  
    console.log('[filterItems] called', {brand, quality, size});
  
    if (undefined !== brand) {
      filteredItems = filteredItems.filter(x => x.brandId === brand);
    }
  
    if (undefined !== quality) {
      filteredItems = filteredItems.filter(x => x.qualityId === quality);
    }
  
    if (undefined !== size) {
      filteredItems = filteredItems.filter(x => x.sizeId === size);
    }
  
    return filteredItems;
  };
  

export const getUniqueAttributesList = (items: ProductItem[]) => {
    // console.log("getUniqueAttributesList called",items)
   
     /**
      * 
      * 
      * input: ProductItem[] (filtered/entire datasets)
      * returns 3 lists with unique values (based on `id`): brands, qualities, sizes
      */
     // https://stackoverflow.com/a/67322087/592737
     //arr.filter((a, i) => arr.findIndex((s) => a.age === s.age) === i) // [{"name":"Joe", "age":17}, {"name":"Carl", "age": 35}]
     const brands = items
       .filter(
         (a, i) =>
           items.findIndex(s => a.brandId && a.brandId === s.brandId) === i,
       )
       .map(x => ({id: x.brandId, name: x.brandName})) as ProductBrand[];
   
     const qualities = items
       .filter(
         (a, i) =>
           items.findIndex(s => a.qualityId && a.qualityId === s.qualityId) === i,
       )
       .map(x => ({id: x.qualityId, name: x.qualityName})) as ProductQuality[];
   
     const sizes = items
       .filter(
         (a, i) => items.findIndex(s => a.sizeId && a.sizeId === s.sizeId) === i,
       )
       .map(x => ({id: x.sizeId, name: x.sizeName})) as ProductSize[];
   
     return {brands, qualities, sizes};
   };
   