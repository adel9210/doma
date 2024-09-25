import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGrid from "./ProductGrid";
import useProductGrid from "./useProductGrid";

const RecentProduct = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
  category,
}) => {
  const { products } = useProductGrid();
  if (!products.length)
    return (
      <div className="text-center container mt-4 bg-aqua p-4 rounded">
        No Products Found!!...
      </div>
    );

  function getRandomItems(arr, num) {
    // Create a shallow copy of the array
    const arrayCopy = [...arr];

    // Shuffle the copied array
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]; // Swap elements
    }

    // Return the first 'num' items
    return arrayCopy.slice(0, num);
  }

  const randomProducts = getRandomItems(products, 8);
  debugger;
  return (
    <div
      className={clsx(
        "product-area",
        spaceTopClass,
        spaceBottomClass,
        bgColorClass,
      )}
    >
      <div className="container mt-5">
        <SectionTitle titleText="Recent Products" positionClass="text-center" />
        <Tab.Container defaultActiveKey="bestSeller">
          <Nav
            variant="pills"
            className="product-tab-list pt-30 pb-55 text-center"
          ></Nav>
          <Tab.Content>
            <Tab.Pane eventKey="bestSeller">
              <div className="row">
                <ProductGrid
                  category={category}
                  products={randomProducts}
                  type="bestSeller"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

RecentProduct.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default RecentProduct;
