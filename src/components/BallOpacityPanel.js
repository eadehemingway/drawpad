import React from "react"
import styled from "styled-components"

export const BallOpacityPanel = ({
  opacity,
  increaseOpacity,
  decreaseOpacity,
}) => {
  return (
    <SizePanel>
      <PanelScreen>opacity: {opacity} </PanelScreen>
      <BtnContainer>
        <RadiusBtn onClick={decreaseOpacity}>-</RadiusBtn>
        <RadiusBtn onClick={increaseOpacity}>+</RadiusBtn>
      </BtnContainer>
    </SizePanel>
  )
}

const RadiusBtn = styled.button`
  border: 2px solid lightsteelblue;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin: 1rem;
  font-size: 1rem;
  background: white;
  color: lightsteelblue;
  outline: none;
  &:hover {
    cursor: pointer;
    font-weight: 900;
    color: #e65c00;
  }
`

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
`
const SizePanel = styled.div`
  border: 1px solid lightsteelblue;
  border-radius: 2%;
  width: 200px;
  position: absolute;
  right: 0;
  top: 450px;
`
const PanelScreen = styled.p`
  border-radius: 10%;
  height: 20px;
  width: 200px;
  margin: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: center;
  color: lightsteelblue;
  margin: auto;
  font-family: sans-serif;
  letter-spacing: 2px;
`
