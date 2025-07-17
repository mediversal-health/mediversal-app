import {ProductCardProps} from '../types';

export const filterProducts = (
  products: any[],
  category: string,
  filters: {[key: string]: boolean},
): ProductCardProps['product'][] => {
  let result = [...products];
  console.log(products, 'products in filterProducts');

  if (category != 'All') {
    result = result.filter(
      product => product.Category?.toLowerCase() == category.toLowerCase(),
    );
    console.log(`Filtered by category: ${category}`, result);
  }

  const activeFilters = Object.keys(filters).filter(key => filters[key]);
  console.log(activeFilters, 'activeFilters in filterProducts');
  if (activeFilters.length > 0) {
    result = result.filter(product => {
      return activeFilters.every(filter => {
        const composition = product.Composition?.toLowerCase() || '';
        const manufacturer = product.manufacturer_name?.toLowerCase() || '';
        const stock = parseInt(product.StockAvailableInInventory, 10) || 0;
        const isRx =
          product.PrescriptionRequired === 'Yes' ||
          product.Category === 'PRESCRIPTION (Rx)';

        switch (filter) {
          case 'inStock':
            return stock > 0;
          case 'outOfStock':
            return stock === 0;
          case 'prescriptionRequired':
            return isRx;
          case 'noPrescriptionRequired':
            return !isRx;
          default:
            return (
              composition.includes(filter.toLowerCase()) ||
              manufacturer.includes(filter.toLowerCase())
            );
        }
      });
    });
  }

  return result;
};
