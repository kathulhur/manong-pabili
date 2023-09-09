import { routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import MarkersCell from "src/components/Admin/Marker/MarkersCell";
import FadeTransitionLayout from "src/layouts/FadeTransitionLayout/FadeTransitionLayout";

const MarkersPage = ({ page = 1, id }) => {
  return (
    <FadeTransitionLayout>

    <div>
      <MetaTags title="Markers" description="Markers page" />

      <MarkersCell page={page} userId={id} paginate={(page) => routes.adminMarkers({
        id,
        page
      })}/>
    </div>
    </FadeTransitionLayout>
  );
};

export default MarkersPage;
