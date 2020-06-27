import React from "react"
import styled from "styled-components"

export const BallColorPanel = ({ color, changeColor }) => {
  const colourDictionary = ["pink", "salmon", "orange", "coral", "steelblue"]

  return (
    <ColorPanel>
      {colourDictionary.map(c => {
        const selected = color === c
        return (
          <Color selected={selected} onClick={() => changeColor(c)}>
            <Circle style={{ background: c }} />
            <PStyled>{c}</PStyled>
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
