import { MetaTags } from "@redwoodjs/web";
import EditMarkerCell from "src/components/Admin/Marker/EditMarkerCell";

type MarkerPageProps = {
  id: number;
};

const EditMarkerPage = ({ id }: MarkerPageProps) => {
  return (
    <div>
      <MetaTags title="Images" description="Images page" />
      <EditMarkerCell id={id} />
    </div>
  );
};

export default EditMarkerPage;
