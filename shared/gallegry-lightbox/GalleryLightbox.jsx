import React, {useEffect} from 'react';
import lgZoom from 'lightgallery/plugins/zoom';
import './gallery-lightbox.scss';
import lgShare from 'lightgallery/plugins/share';
import lgHash from 'lightgallery/plugins/hash';
import Image from "next/image";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), {ssr: false});
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";


const GalleryLightbox = ({images}) => {

    return (
        <LightGallery elementClassNames="gallery" plugins={[lgZoom, lgShare, lgHash]} speed={500}>
            {images.map(img => (
                <a key={img.id} href={img.sourceUrl}>

                    <Image
                        src={img.sourceUrl}
                        alt={img.altText || "Image"}
                        width={250}
                        height={250}
                        style={{objectFit: "cover"}}
                    />
                </a>
            ))}
        </LightGallery>
    );
};

export default GalleryLightbox;

