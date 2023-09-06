import ImageCell from "src/components/Admin/Image/ImageCell";

type ImagePageProps = {
  id: number;
};

const ImagePage = ({ id }: ImagePageProps) => {
  return <ImageCell id={id} />;
};

export default ImagePage;
