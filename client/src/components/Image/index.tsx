import React from "react";
import Skeleton from "react-loading-skeleton";

export interface ImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  skeletonHeight?: number;
  skeletonWidth?: number;
}

const Image = ({
  skeletonHeight,
  skeletonWidth,
  src,
  alt,
  ...otherProps
}: ImageProps) => {
  return (
    <>
      {!src && <Skeleton height={skeletonHeight} width={skeletonWidth} />}
      <img src={src} alt={alt} {...otherProps} />
    </>
  );
};

export default Image;
