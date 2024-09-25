import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import RecentProduct from "../../wrappers/product/recentProduct";

const HomeFashion = () => {
  return (
    <Fragment>
      <SEO titleTemplate="Doma EG Store" description="Doma Store" />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}
        <HeroSliderOne />

        {/* featured icon */}
        <RecentProduct />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60 pt-100" category="" />
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* blog featured */}
        {/*<BlogFeatured spaceBottomClass="pb-55" />*/}
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
