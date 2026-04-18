import "./index.css";
import { Composition } from "remotion";
import { QuadraticExplainer, quadraticVideoMeta } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="QuadraticExplainer"
        component={QuadraticExplainer}
        durationInFrames={quadraticVideoMeta.durationInFrames}
        fps={quadraticVideoMeta.fps}
        width={quadraticVideoMeta.width}
        height={quadraticVideoMeta.height}
      />
    </>
  );
};
