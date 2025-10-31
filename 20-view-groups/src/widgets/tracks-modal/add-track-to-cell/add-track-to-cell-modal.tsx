import { Track } from "../shared/types";
import { TrackForm } from "../shared/track-form";
import { TrackModalView } from "../shared/track-modal";
import { useAddTrackToCell } from "./use-add-track-to-cell";
import { useTrackModal } from "../shared/use-track-modal";
import { globalEventEmmiter } from "@/interfaces/events";

export function AddTrackToCellModal({
  trackCreate,
}: {
  trackCreate: (track: Omit<Track, "id">) => Promise<void>;
}) {
  const { close, isOpenModal, selectedCell, cellClick } = useTrackModal();
  globalEventEmmiter.useEvent("cellClick", cellClick);

  const { formData, handleInputChange, handleSubmit } = useAddTrackToCell({
    trackCreate,
    onSubmit: close,
    selectedCell,
  });

  if (!isOpenModal) return null;

  return (
    <TrackModalView title="Add Track to Cell" close={close}>
      <TrackForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onCancel={close}
        submitText="Add Track"
        disabled={{
          date: true,
          task: true,
        }}
      />
    </TrackModalView>
  );
}
