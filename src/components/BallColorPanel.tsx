import React from "react"
import styled from "styled-components"

export const BallColorPanel = ({ color, changeColor }) => {
  const colourDictionary = [
    { name: "pink", css: "pink" },
    { name: "salmon", css: "salmon" },
    { name: "orange", css: "orange" },
    { name: "grey blue", css: "steelblue" },
    { name: "light blue", css: "#99b3ff" },
  ]

  return (
    <ColorPanel>
      {colourDictionary.map(c => {
        const { name, css } = c
        const selected = color === css
        return (
          <Color selected={selected} onClick={() => changeColor(css)}>
            <Circle style={{ background: css }} />
            <PStyled>{name}</PStyled>
          </Color>
        )
      })}
    </ColorPanel>
  )
}

const PStyled = styled.p`
  margin: 10px 20px;
  font-family: Major Mono;
  color: grey;
`

const Circle = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-left: 20px;
  opacity: 0.5;
`
const Color = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  background: ${({ selected }) => (selected ? "linen" : "white")};
`

const ColorPanel = styled.div`
  border: 1px solid lightsteelblue;
  border-radius: 2%;
  width: 200px;
`
