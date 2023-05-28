import React from 'react';


type GeneratedImageDisplayProps = {
    imgUrl: string
}

export const GeneratedImageDisplay = (props: GeneratedImageDisplayProps) => {
    // const [imageUrl, setImageUrl] = useState<string>('');
    const { imgUrl } = props

    return (
        <div className='container'>
            <img src = {imgUrl} alt="Generated Image"/>
        </div>
    )
}