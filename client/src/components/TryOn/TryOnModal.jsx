import React, { useEffect, useRef } from "react";
import "./TryOnModal.css";
import useFaceLandmarker from "./useFaceLandmarker";
import CanvasOverlay from "./CanvasOverlay";


function TryOnModal({ isOpen, onClose, product }) {

    const videoRef = useRef(null);
    const { faceLandmarks } =
        useFaceLandmarker(videoRef);

    useEffect(() => {

        if (!isOpen) return;


        async function startCamera() {

            try {

                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                });


                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }


            } catch (error) {

                console.error(
                    "Camera permission error:",
                    error
                );

            }

        }


        startCamera();



        // cleanup when modal closes
        return () => {

            if (videoRef.current?.srcObject) {

                const tracks =
                    videoRef.current.srcObject.getTracks();


                tracks.forEach(track => track.stop());

            }

        };


    }, [isOpen]);



    if (!isOpen) return null;



    return (

        <div className="tryon-overlay">

            <div className="tryon-modal">


                <div className="tryon-header">

                    <h2>
                        Virtual Try-On
                    </h2>


                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>



                <div className="camera-container">


                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="camera-video"
                    />


                    <CanvasOverlay

                        videoRef={videoRef}

                        landmarks={faceLandmarks}

                    />
                    <p>
                        {
                            faceLandmarks
                                ? "Face detected ✅"
                                : "Searching for face..."
                        }
                    </p>



                    {product && (

                        <p>
                            Testing: {product.name}
                        </p>

                    )}


                </div>



            </div>

        </div>

    );

}


export default TryOnModal;