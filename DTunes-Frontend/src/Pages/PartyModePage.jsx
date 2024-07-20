import LoggedInContainer from "../Containers/LoggedInContainer";

function PartyModePage()
{
   return (
    <LoggedInContainer currentActiveScreen={"PartyMode"}>
        hello party mode 
    </LoggedInContainer>
   )
}

export default PartyModePage;