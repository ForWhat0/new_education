import Image from 'next/image'

function Icon({src,alt,width,height}) {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
        />
    )
}

export default Icon