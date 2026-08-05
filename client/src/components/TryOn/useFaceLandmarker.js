import { useEffect, useRef, useState } from "react";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";


function useFaceLandmarker(videoRef) {

    const faceLandmarkerRef = useRef(null);
    const animationRef = useRef(null);

    const [faceLandmarks, setFaceLandmarks] = useState(null);


    useEffect(() => {

        let cancelled = false;


        async function createLandmarker() {

            try {

                const vision =
                    await FilesetResolver.forVisionTasks(
                        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
                    );


                const landmarker =
                    await FaceLandmarker.createFromOptions(
                        vision,
                        {
                            baseOptions: {
                                modelAssetPath:
                                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
                            },

                            runningMode: "VIDEO",

                            numFaces: 1
                        }
                    );


                if (!cancelled) {

                    faceLandmarkerRef.current = landmarker;

                }


            } catch (error) {

                console.error(
                    "MediaPipe loading error:",
                    error
                );

            }

        }


        createLandmarker();


        return () => {

            cancelled = true;

        };


    }, []);



    useEffect(() => {


        function detectFace() {


            const video = videoRef.current;
            const landmarker = faceLandmarkerRef.current;


            if (
                video &&
                landmarker &&
                video.readyState >= 3
            ) {


                try {


                    const result =
                        landmarker.detectForVideo(
                            video,
                            performance.now()
                        );


                    if (
                        result.faceLandmarks &&
                        result.faceLandmarks.length
                    ) {


                        setFaceLandmarks(
                            result.faceLandmarks[0]
                        );


                    } else {


                        setFaceLandmarks(null);


                    }


                } catch (error) {

                    console.error(
                        "Detection error:",
                        error
                    );

                }


            }


            animationRef.current =
                requestAnimationFrame(detectFace);

        }


        detectFace();


        return () => {

            cancelAnimationFrame(
                animationRef.current
            );

        };


    }, []);



    return {
        faceLandmarks
    };

}


export default useFaceLandmarker;