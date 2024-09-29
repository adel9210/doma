import Skeleton from "react-loading-skeleton";

const NoProductsSkeleton = () => {
  const Box = ({ children }) => (
    <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6">{children}</div>
  );

  return (
    <div className="container">
      <div className="row d-flex">
        <Skeleton
          containerClassName="row"
          style={{ height: 250, marginBottom: 30 }}
          count={4}
          wrapper={Box}
        />
      </div>
    </div>
  );
};

export default NoProductsSkeleton;
