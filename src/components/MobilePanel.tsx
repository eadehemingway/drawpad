import React, { useState } from "react"
import { BallColorPanel } from "../components/BallColorPanel.tsx"
import arrow from "../assets/arrow.png"

import styled from "styled-components"
import { IncreaseDecreasePanel } from "../components/IncreaseDecreasePanel"

export default function MobilePanel({
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
  const [drawerOpen, setDrawerOpen] = useState(false)
  function toggleDrawer() {
    setDrawerOpen(!drawerOpen)
  }
  return (
    <PanelWrapper drawerOpen={drawerOpen}>
      <Open drawerOpen={drawerOpen} onClick={toggleDrawer} src={arrow} />{" "}
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

const Open = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 10px;

  top: 10px;
  transition: transform 0.5s;
  transform: ${({ drawerOpen }) => {
    return drawerOpen ? "rotate(180deg)" : null
  }};
`

const PStyled = styled.p`
  margin: 30px 0;
  font-family: futura;
  width: 200px;
  color: lightsteelblue;
`

const PanelWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 0 30px;
  padding-top: 20px;
  background: white;
  top: 0;
  border-left: 1px solid lightsteelblue;
  padding-left: 40px;
  transition: right 0.5s;
  ${({ drawerOpen }) => {
    return drawerOpen ? "right: 10px;" : "right: -230px;"
  }}
`

const ClearBtn = styled.button`
  border: 1px solid lightsteelblue;
  font-family: futura;
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  width: 200px;
  font-size: 1rem;
  background: white;
  color: lightsteelblue;
  outline: none;
  margin-top: 20px;
`
