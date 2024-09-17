import { useSelector } from "react-redux";

export const Loader = () => {
  const { isLoading } = useSelector((state) => state.app);
  return isLoading ? (
    <div className="flone-preloader-wrapper">
      <div className="flone-preloader">
        <span></span>
        <span></span>
      </div>
    </div>
  ) : (
    <></>
  );
};
