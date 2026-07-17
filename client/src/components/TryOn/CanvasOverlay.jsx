import React, { useEffect, useRef } from "react";
import glassesImage from "../../assets/frames/sample-glasses.png";
import { smoothValue } from "./smoothPosition";

function CanvasOverlay({ videoRef, landmarks }) {

    const canvasRef = useRef(null);
    const previousPosition = useRef({
        x:0,
        y:0,
        width:0,
        height:0,
        angle:0
    });


    useEffect(() => {


        if (
            !canvasRef.current ||
            !videoRef.current ||
            !landmarks
        ) {
            return;
        }



        const canvas = canvasRef.current;
        const video = videoRef.current;

        const ctx = canvas.getContext("2d");



        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;



        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );



        /*
            MediaPipe landmarks:

            Left eye area
            landmark 33

            Right eye area
            landmark 263

        */


        const leftEye = landmarks[33];
        const rightEye = landmarks[263];



        const eyeDistance = Math.abs(
            rightEye.x - leftEye.x
        ) * canvas.width;



        const targetWidth =
    eyeDistance * 2.4;


const glassesWidth =
    smoothValue(
        targetWidth,
        previousPosition.current.width
    );



        const glassesHeight =
            glassesWidth * 0.45;



            const targetX =
            ((leftEye.x + rightEye.x) / 2)
            * canvas.width;
        
        
        const centerX =
            smoothValue(
                targetX,
                previousPosition.current.x
            );


            const targetY =
            ((leftEye.y + rightEye.y) / 2)
            * canvas.height;
        
        
        const centerY =
            smoothValue(
                targetY,
                previousPosition.current.y
            );



        const x =
            centerX - glassesWidth / 2;



        const y =
            centerY - glassesHeight / 2;



        const img = new Image();


        img.src = glassesImage;



        img.onload = () => {


            const targetAngle = Math.atan2(

                (rightEye.y - leftEye.y) * canvas.height,
            
                (rightEye.x - leftEye.x) * canvas.width
            
            );
            
            
            const angle =
                smoothValue(
                    targetAngle,
                    previousPosition.current.angle
                );
            
            
            
            ctx.save();
            
            
            
            ctx.translate(
                centerX,
                centerY
            );
            
            
            
            ctx.rotate(angle);
            
            
            
            ctx.drawImage(
            
                img,
            
                -glassesWidth / 2,
            
                -glassesHeight / 2,
            
                glassesWidth,
            
                glassesHeight
            
            );
            
            
            
            ctx.restore();
            previousPosition.current = {

                x:centerX,
            
                y:centerY,
            
                width:glassesWidth,
            
                height:glassesHeight,
            
                angle:angle
            
            };


        };



    }, [landmarks]);



    return (

        <canvas
            ref={canvasRef}
            className="face-canvas"
        />

    );

}


export default CanvasOverlay;