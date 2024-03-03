import { colorTheme } from "@colorTheme";
import styled from "styled-components";


export const ModalContainer = styled.div`
  
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 200;
`;

export const WindowContainer = styled.div`
    //height: 400px;
   // width: 400px;
  
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%,-50%);

`;

