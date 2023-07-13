type ProductItem = {
  id: number;
  name: string;
  fullName: string;
  brandId: number;
  brandName: string;
  qualityId: number | null;
  qualityName: string | null;
  sizeId: number | null;
  sizeName: string | null;
};

type ProductsFilter = {
  brand?: number;
  quality?: number;
  size?: number;
};

type ProductBrand = {
  id: number;
  name: string;
};

type ProductQuality = {
  id: number;
  name: string;
};

type ProductSize = {
  id: number;
  name: string;
};

type FilterPayloadParams = {
  name: keyof ProductsFilter;
  id: number;
};
