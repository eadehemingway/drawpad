import React from "react"
import styled from "styled-components"

export const IncreaseDecreasePanel = ({
  propertyName,
  property,
  increase,
  decrease,
}) => {
  return (
    <Panel>
      <Pstyled>{propertyName} </Pstyled>
      <BtnContainer>
        <Btn onClick={decrease}>-</Btn>
        <PanelScreen>{property} </PanelScreen>
        <Btn onClick={increase}>+</Btn>
      </BtnContainer>
    </Panel>
  )
}

const Btn = styled.button`
  // border: 2px solid lightsteelblue;
  border: none;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  font-size: 40px;
  background: white;
  color: lightsteelblue;
  outline: none;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    font-weight: 900;
    color: #e65c00;
  }
`

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const Panel = styled.div`
  border: 1px solid lightsteelblue;
  border-radius: 3px;
  width: 200px;
  margin-top: 30px;
`
const PanelScreen = styled.p`
  margin: 1rem;
  padding: 0.5rem;
  font-size: 30px;
  border: 1px solid lightsteelblue;
  width: fit-content;
  color: lightsteelblue;
  margin: auto;
  font-family: futura;
  letter-spacing: 2px;
  border-radius: 3px;
`

const Pstyled = styled.p`
  margin: 10px;
  font-family: futura;
`
