import { TrackForm } from "../shared/track-form";
import { TrackModalView } from "../shared/track-modal";
import { useAddTrackWithParams } from "./use-add-track-with-params";
import { useTrackModal } from "../shared/use-track-modal";
import { globalEventEmmiter } from "@/interfaces/events";
import { useTracks } from "@/services/track";

export function AddTrackWithParamsModal() {
  const { trackCreate } = useTracks({ shouldFetch: false });
  const { close, isOpenModal, selectedCell, cellClick } = useTrackModal();
  globalEventEmmiter.useEvent("createTrackWithParams", cellClick);

  const { formData, handleInputChange, handleSubmit } = useAddTrackWithParams({
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
