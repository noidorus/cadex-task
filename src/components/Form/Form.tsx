import { FormEvent, createRef } from 'react';

import './Form.css';

interface FormProps {
  updateConeGeometry: (data: {
    height: number;
    radius: number;
    segments: number;
  }) => void;
}

export const Form = ({ updateConeGeometry }: FormProps) => {
  const heightInputRef = createRef<HTMLInputElement>();
  const radiusInputRef = createRef<HTMLInputElement>();
  const segmentsInputRef = createRef<HTMLInputElement>();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      height: +heightInputRef.current!.value,
      radius: +radiusInputRef.current!.value,
      segments: +segmentsInputRef.current!.value,
    };

    updateConeGeometry(data);
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <label className="form__field">
        <input required ref={heightInputRef} type="number" min={1} />
        Height
      </label>
      <label className="form__field">
        <input required ref={radiusInputRef} type="number" min={1} />
        Radius
      </label>
      <label className="form__field">
        <input required ref={segmentsInputRef} type="number" min={3} />
        Number of segments
      </label>
      <button type="submit">Send</button>
    </form>
  );
};
