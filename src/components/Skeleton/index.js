import React from "react";
import './styles.css';

export default function Skeleton() {
  const n=8;
  const FeedSkeleton = () => (
    <div className="productSkeleton">
    <div className="productImgSkeleton"></div>
    <div className="productInfoSkeleton">
      <div className="productDetailSkeleton">
        <div className="productTextSkeleton"></div>
        <div className="productTextSkeleton"></div>
        <div className="productTextSkeleton"></div>
        <div className="productTextSkeleton"></div>
        <div className="productTextSkeleton sm"></div>
        <div className="buttonSkeleton"></div>
      </div>
    </div>
  </div>
  );
  return (<div className="skeletonContainer">
  {[...Array(n)].map(item => <FeedSkeleton key={Math.random()*Date.now()} />)}
  </div>
  );
}
