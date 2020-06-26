import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import { BallColorPanel } from "../components/BallColorPanel"
import { BallSizePanel } from "../components/BallSizePanel"
import styled from "styled-components"
import { BallOpacityPanel } from "../components/BallOpacityPanel"

export default function MouseGame2() {
  const [data, setData] = useState([])
  const [color, setColor] = useState("coral")
  const [radius, setRadius] = useState(10)
  const [opacity, setOpacity] = useState(0.3)
  const [drawCirclesBool, setDrawerCirclesBool] = useState(true)

  useEffect(() => {
    const svg = d3.select("svg")

    svg
      .append("text")
      .text("draw on me")
      .attr("x", 300)
      .attr("y", 400)
      .attr("font-family", "futura")
      .attr("font-size", 70)
      .attr("opacity", 0.1)

    document.addEventListener("keydown", pauseCircles)
  }, [])

  function pauseCircles(e) {
    if (e.keyCode === 32) {
      setDrawerCirclesBool(!drawCirclesBool)
    }
  }

  useEffect(() => {
    drawCircles()
  }, [data])

  useEffect(() => {
    document.addEventListener("keydown", pauseCircles)
  }, [drawCirclesBool])

  function addNode(e) {
    if (!drawCirclesBool) return

    const newData = [
      ...data,
      { id: e.timeStamp, x: e.clientX - 10, y: e.clientY - 10 },
    ]
    setData(newData)
  }

  function drawCircles() {
    if (!drawCirclesBool) return

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

    circles.exit().transition().duration(100).attr("opacity", 0).remove()
  }

  function clear() {
    const circles = d3.select("svg").selectAll("circle")
    setData([])
    circles.remove()
  }

  function increaseRadius() {
    setRadius(radius + 10)
  }

  function decreaseRadius() {
    setRadius(radius - 10)
  }
  function increaseOpacity() {
    setOpacity(opacity + 0.1)
  }

  function decreaseOpacity() {
    if (opacity < 0.1) return
    const newOpacity = opacity - 0.1

    setOpacity(newOpacity)
  }

  return (
    <Container>
      <Svg onMouseMove={addNode}></Svg>
      <ClearBtn onClick={clear}>clear</ClearBtn>
      <PanelWrapper>
        <BallColorPanel color={color} changeColor={setColor} />
        <BallSizePanel
          radius={radius}
          increaseRadius={increaseRadius}
          decreaseRadius={decreaseRadius}
        />
        <BallOpacityPanel
          opacity={opacity}
          increaseOpacity={increaseOpacity}
          decreaseOpacity={decreaseOpacity}
        />
      </PanelWrapper>
    </Container>
  )
}

const PanelWrapper = styled.div`
  display: flex;
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
`
const ClearBtn = styled.button`
  border: 2px solid lightsteelblue;
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  width: 200px;
  margin: 1rem;
  font-size: 1rem;
  background: white;
  color: lightsteelblue;
  outline: none;
  position: absolute;
  right: 0;
  bottom: 0;
`
