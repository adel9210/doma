import PropTypes from "prop-types";
import clsx from "clsx";
import ShopCategories from "../../components/product/ShopCategories";
import useCategories from "../../pages/admin/categories/use-categories";

const ShopSidebar = ({ products, getSortParams, sideSpaceClass }) => {
  const { categories } = useCategories();
  const uniqueCategories = categories?.map((item) => item.name);

  return (
    <div className={clsx("sidebar-style", sideSpaceClass)}>
      {/* shop search */}
      {/*<ShopSearch />*/}

      {/* filter by categories */}
      <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
      />

      {/* filter by color */}
      {/*<ShopColor colors={uniqueColors} getSortParams={getSortParams} />*/}

      {/* filter by size */}
      {/*<ShopSize sizes={uniqueSizes} getSortParams={getSortParams} />*/}

      {/* filter by tag */}
      {/*<ShopTag tags={uniqueTags} getSortParams={getSortParams} />*/}
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
