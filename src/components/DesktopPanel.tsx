import React from "react"
import { BallColorPanel } from "../components/BallColorPanel.tsx"

import styled from "styled-components"
import { IncreaseDecreasePanel } from "../components/IncreaseDecreasePanel"

export default function DesktopPanel({
  color,
  setColor,
  radius,
  increaseRadius,
  decreaseOpacity,
  decreaseRadius,
  increaseOpacity,
  clear,
  opacity,
}) {
  return (
    <PanelWrapper>
      <BallColorPanel color={color} changeColor={setColor} />
      <IncreaseDecreasePanel
        property={radius}
        propertyName="Radius"
        increase={increaseRadius}
        decrease={decreaseRadius}
      />
      <IncreaseDecreasePanel
        property={opacity}
        propertyName="Opacity"
        increase={increaseOpacity}
        decrease={decreaseOpacity}
      />
      <ClearBtn onClick={clear}>clear</ClearBtn>
      <PStyled>Press space bar to pause/start paintbrush</PStyled>
    </PanelWrapper>
  )
}

const PStyled = styled.p`
  margin: 30px 0;
  font-family: Major Mono;
  width: 200px;
  color: grey;
`

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 30px;
  top: 0;
  padding-left: 20px;
  right: 30px;
`

const ClearBtn = styled.button`
  border: 1px solid lightsteelblue;
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  width: 200px;
  font-size: 1rem;
  background: white;
  color: grey;
  outline: none;
  margin-top: 50px;
`
