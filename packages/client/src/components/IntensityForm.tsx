//TODO: what to do when component unmount?
//TODO: It should be horizontally and vertically centered

import styled from "@emotion/styled";
import React, { useState } from "react";
import { FormDataType } from "./Form";

const Container = styled("div")({
  position: "fixed",
  left: 0,
  bottom: 0,
  height: "100vh",
  width: "100vw",
  zIndex: 2,
  backgroundColor: "rgba(0, 0, 0, 0.20)",
});

const FormWrapper = styled("div")({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: 160,
  width: 200,
  margin: "auto",
  border: "2px solid black",
  padding: 15,
  borderRadius: 8,
  backgroundColor: "white",
  boxShadow: "10px 10px 8px #888888",
});

const Header = styled("div")({
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
});

const SelectedEmotion = styled("p")({
  fontSize: 15,
  textAlign: "center",
  fontWeight: "bolder",
});

const SubmitWrapper = styled("div")({
  display: "flex",
});

const DoneButton = styled("button")({
  padding: 4,
  border: "2px solid black",
  borderRadius: 8,
  cursor: "pointer",
  marginLeft: "auto",
});

const RemoveButton = styled("button")({
  padding: 4,
  border: "2px solid black",
  borderRadius: 8,
  cursor: "pointer",
});

const StyledSlider = styled("input")({
  cursor: "pointer",
});

interface Props {
  event: any;
  setIntensityForm: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  formData: FormDataType;
  setFormData: any;
}

const IntensityForm = (props: Props) => {
  const { event, setIntensityForm, formData, setFormData } = props;
  const { id }: { id: string } = event.target;
  const selectedEmotion =
    formData.emotions[id as keyof typeof formData.emotions];
  // to force update this component
  const [intensity, setIntensity] = useState(selectedEmotion.intensity);
  const handleChange = (e: any) => {
    setFormData((formData: FormDataType) => ({
      ...formData,
      emotions: {
        ...formData.emotions,
        [id]: {
          ...selectedEmotion,
          intensity: e.target.value,
        },
      },
    }));
    setIntensity(e.target.value);
  };
  const handleCancel = () => {
    setFormData((formData: FormDataType) => ({
      ...formData,
      emotions: {
        ...formData.emotions,
        [id]: {
          value: false,
          intensity: 30,
        },
      },
    }));
    setIntensityForm(null);
  };
  const handleDone = () => {
    setFormData((formData: FormDataType) => ({
      ...formData,
      emotions: {
        ...formData.emotions,
        [id]: {
          value: true,
          intensity: intensity,
        },
      },
    }));
    setIntensityForm(null);
  };

  return (
    <Container>
      <FormWrapper>
        <Header>Select Intensity</Header>
        <SelectedEmotion>
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </SelectedEmotion>
        <StyledSlider
          type="range"
          min="10"
          max="100"
          value={intensity}
          onChange={(e: any) => handleChange(e)}
        />
        <SubmitWrapper>
          <RemoveButton onClick={handleCancel}>Remove</RemoveButton>
          <DoneButton onClick={handleDone}>Done</DoneButton>
        </SubmitWrapper>
      </FormWrapper>
    </Container>
  );
};

export default IntensityForm;
