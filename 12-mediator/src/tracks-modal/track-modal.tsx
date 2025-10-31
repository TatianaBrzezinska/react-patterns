import { Track } from "../App";
import { TrackForm } from "./components/track-form";
import { TrackModalView } from "./components/track-modal";
import { useTrackModalContext } from "./components/track-modal-context";
import { useTrackForm } from "./hooks/use-track-form";

export function TrackModal({
  trackCreate,
  trackUpdate,
  selectedMonth,
  selectedYear,
}: {
  trackCreate: (track: Omit<Track, "id">) => void;
  trackUpdate: (track: Track) => void;
  selectedMonth: number;
  selectedYear: number;
}) {
  const { close, isOpenModal, selectedCell, selectedTrack } =
    useTrackModalContext();

  const { formData, handleInputChange, handleSubmit, isEdit } = useTrackForm({
    selectedMonth,
    selectedYear,
    selectedCell,
    selectedTrack,
    trackCreate,
    trackUpdate,
  });

  if (!isOpenModal) return null;

  return (
    <TrackModalView isEdit={isEdit} close={close}>
      <TrackForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onCancel={close}
        isEdit={isEdit}
      />
    </TrackModalView>
  );
}
