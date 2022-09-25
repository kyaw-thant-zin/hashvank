import { Card, CardActionArea, CardMedia } from "@mui/material";
import React from "react";

export default function VideoViewCop(props) {

  return (
    <Card>
        <CardActionArea>
            <CardMedia 
                component="video"
                image={props.url}
                controls={props.controls}
                autoPlay
                muted
                loop
                preload="none"
                onLoadedData={props.onLoadedData}
            />
        </CardActionArea>
    </Card>
  )
}