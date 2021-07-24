import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface props{
    inverted?: boolean,
    content?: string
}

export default function LoadingComponent({inverted = true, content='Loading...'}: props ){
    return(
        <Dimmer active={true} inverted={inverted} >
            <Loader content={content}  />
        </Dimmer>
    )
}