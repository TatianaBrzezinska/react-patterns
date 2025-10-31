import { TrackForm } from "../ui/track-form";
import { TrackModalView } from "../ui/track-modal";
import { useTrackModal } from "../model/use-track-modal";
import { globalEventEmmiter } from "@/kernel/events";
import { useTracks } from "@/services/track";
import { useSelectedTrackEffect } from "../model/use-selected-track-effect";
import { useFormData } from "../model/use-form-data";

export function UpdateTrackModal() {
  const { close, isOpenModal, selectedTrack, trackClick } = useTrackModal();
  globalEventEmmiter.useEvent("trackUpdate", trackClick);

  const { trackUpdate } = useTracks({ shouldFetch: false });

  const { formData, handleInputChange, resetFormData, setFormData } =
    useFormData();

  useSelectedTrackEffect({
    selectedTrack,
    setFormData,
    resetFormData,
  });

  const onSubmit = () =>
    selectedTrack &&
    trackUpdate({ ...selectedTrack, ...formData }).finally(resetFormData);

  if (!isOpenModal) return null;

  return (
    <TrackModalView title="Update Track" close={close}>
      <TrackForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={onSubmit}
        onCancel={close}
      />
    </TrackModalView>
  );
}
