import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import { BallColorPanel } from "../components/BallColorPanel.tsx"

import styled from "styled-components"
import paintbrush from "../assets/paintbrush.png"
import { IncreaseDecreasePanel } from "../components/IncreaseDecreasePanel"

export default function MouseGame2() {
  const [data, setData] = useState([])
  const [color, setColor] = useState("coral")
  const [radius, setRadius] = useState(10)
  const [opacity, setOpacity] = useState(0.3)
  const [pauseDrawing, setPauseDrawing] = useState(false)

  useEffect(() => {
    const svg = d3.select("svg")

    svg
      .append("text")
      .text("draw on me")
      .attr("x", 400)
      .attr("y", 300)
      .attr("font-family", "futura")
      .attr("font-size", 70)
      .attr("opacity", 0.1)

    document.addEventListener("keydown", pauseCircles)
  }, [])

  function pauseCircles(e) {
    if (e.keyCode === 32) {
      setPauseDrawing(!pauseDrawing)
    }
  }

  useEffect(() => {
    drawCircles()
  }, [data])

  useEffect(() => {
    document.addEventListener("keydown", pauseCircles)
  }, [pauseDrawing])

  function addNode(e) {
    if (pauseDrawing) return

    const newData = [
      ...data,
      { id: e.timeStamp, x: e.clientX - 10, y: e.clientY - 10 },
    ]
    setData(newData)
  }

  function drawCircles() {
    if (pauseDrawing) return

    const circles = d3
      .select("svg")
      .selectAll("circle")
      .data(data, d => d.id)

    circles
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", radius)
      .attr("fill", color)
      .attr("opacity", opacity)
  }

  function clear() {
    const circles = d3.select("svg").selectAll("circle")
    setData([])
    circles.remove()
  }

  function increaseRadius() {
    if (radius === 150) return
    setRadius(radius + 10)
  }

  function decreaseRadius() {
    if (radius === 10) return
    setRadius(radius - 10)
  }

  function increaseOpacity() {
    if (opacity === 1) return
    const newOpacity = opacity + 0.1
    const roundedOpacity = newOpacity.toFixed(1)
    setOpacity(Number(roundedOpacity))
  }

  function decreaseOpacity() {
    if (opacity === 0.1) return
    const newOpacity = opacity - 0.1
    const roundedOpacity = newOpacity.toFixed(1)
    setOpacity(Number(roundedOpacity))
  }

  return (
    <Container>
      <Svg onMouseMove={addNode} pauseDrawing={pauseDrawing}></Svg>

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
    </Container>
  )
}

const PStyled = styled.p`
  margin: 30px 0;
  font-family: futura;
  width: 200px;
  color: lightsteelblue;
`

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 30px;
  top: 0;
`
const Container = styled.div`
  position: relative;
  width: 100%;
`

const Svg = styled.svg`
  width: 80%;
  margin: auto;
  height: 700px;
  border: 10px solid lightsteelblue;
  cursor: ${({ pauseDrawing }) =>
    pauseDrawing ? "default" : `url(${paintbrush}) 0 20, auto`};
`
const ClearBtn = styled.button`
  border: 1px solid lightsteelblue;
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  width: 200px;
  font-size: 1rem;
  background: white;
  color: lightsteelblue;
  outline: none;
  margin-top: 50px;
`
