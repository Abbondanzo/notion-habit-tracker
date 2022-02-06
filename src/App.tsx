import styled from "styled-components";
import { CheckboxRow } from "./daily/components/CheckboxRow";

const AppWrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  text-align: center;
`;

function App() {
  return (
    <AppWrapper>
      <CheckboxRow />
    </AppWrapper>
  );
}

export default App;
