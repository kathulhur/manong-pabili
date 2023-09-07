import { XMarkIcon } from "@heroicons/react/20/solid";

const FeaturedImage = ({ image, imageDeleteLoading, deleteImageHandler }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p>{image.title}</p>
        <button
          className="border p-2 rounded-md"
          onClick={() => deleteImageHandler(image.id)}
          disabled={imageDeleteLoading}
        >
          <XMarkIcon className="w-4 h-4" />
          </button>
      </div>
      <img src={image.url} alt={image.title} className=" object-scale-down" />
    <hr />
    </div>
  );
};

export default FeaturedImage;
