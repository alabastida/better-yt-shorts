import { isVideoPlaying, restartShort } from "./VideoState";
import { PolyDictionary, StateObject } from "./definitions";
import { getCurrentId } from "./getters";

export function numberOfReplays(state: StateObject, options: PolyDictionary) {
  const currentId = getCurrentId();

  if (currentId === null) return;

  // console.dir({
  //   "options are null": options === null,
  //   "is the video playing": isVideoPlaying(),
  //   "option isnt enabled": !options.skipEnabled,
  //   "current id below top id": currentId < state.topId,
  //   "current id is the skipped id": state.skippedId === currentId,
  //   "likecount is null or undefined": likeCount === null || isNaN( likeCount ),
  //   "likecount is above threshold": likeCount >= options.skipThreshold
  // })

  if (options === null) return false;
  if (!isVideoPlaying()) return false; // video unstarted
  if (state.skippedId === currentId) return false; // prevent skip spam

  return true;
}

export function handleNumberOfReplays(
  state: StateObject,
  options: PolyDictionary,
) {
    console.log("Current replay: " + state.currentReplay + ", for Id: " + getCurrentId());
    if((state.currentReplay ?? 0) < options.numberOfReplays) {
        state.currentReplay = (state.currentReplay as number) + 1;
        restartShort();
        return;
    }
}
