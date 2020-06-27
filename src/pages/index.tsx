import React, { useEffect, useState } from "react"
import * as d3 from "d3"

import styled from "styled-components"
import paintbrush from "../assets/paintbrush.png"
import DesktopPanel from "../components/DesktopPanel"
import MobilePanel from "../components/MobilePanel"

export default function MouseGame2() {
  const [data, setData] = useState([])
  const [color, setColor] = useState("coral")
  const [radius, setRadius] = useState(10)
  const [opacity, setOpacity] = useState(0.3)
  const [pauseDrawing, setPauseDrawing] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const svg = d3.select("svg")
    const isDesktop = window.innerWidth > 500
    setIsDesktop(isDesktop)
    svg
      .append("text")
      .text("draw on me")
      .attr("x", "50%")
      .attr("y", "50%")
      .attr("font-family", "futura")
      .attr("font-size", d => (isDesktop ? 70 : 24))
      .attr("opacity", 0.1)
      .attr("text-anchor", "middle")

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
  function addNodeMobile(e) {
    const newData = [
      ...data,
      {
        id: e.timeStamp,
        x: e.touches[0].clientX - 10,
        y: e.touches[0].clientY - 10,
      },
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
      <Svg
        onMouseMove={addNode}
        onTouchMove={addNodeMobile}
        pauseDrawing={pauseDrawing}
      ></Svg>
      {isDesktop ? (
        <DesktopPanel
          color={color}
          setColor={setColor}
          radius={radius}
          increaseRadius={increaseRadius}
          decreaseOpacity={decreaseOpacity}
          decreaseRadius={decreaseRadius}
          increaseOpacity={increaseOpacity}
          clear={clear}
          opacity={opacity}
        />
      ) : (
        <MobilePanel
          color={color}
          setColor={setColor}
          radius={radius}
          increaseRadius={increaseRadius}
          decreaseOpacity={decreaseOpacity}
          decreaseRadius={decreaseRadius}
          increaseOpacity={increaseOpacity}
          clear={clear}
          opacity={opacity}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  top: 0;
  @media (max-width: 500px) {
    position: fixed;
  }
`

const Svg = styled.svg`
  width: 80%;
  margin: auto;
  height: 95vh;
  border: 10px solid lightsteelblue;
  cursor: ${({ pauseDrawing }) =>
    pauseDrawing ? "default" : `url(${paintbrush}) 0 20, auto`};
  @media (max-width: 500px) {
    height: 95vh;
  }
`
