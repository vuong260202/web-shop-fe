import {useState} from "react";

const Banner = () => {
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        // Use FileReader to read the selected file and convert it into a data URL
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result); // Set the data URL as the image source
        };
        reader.readAsDataURL(selectedFile); // Read the selected file

        // You can also upload the file to the server here if needed
    };

    return (
        <div>

            <input type="file" onChange={handleFileChange}/>
            <div>
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Selected"
                        style={{maxWidth: '100%', maxHeight: '250px'}}
                    />
                )}
            </div>
            {/* File input for selecting the image */}
        </div>
    );
};

export default Banner;