import { useState, useRef } from 'react'
import Success from "../../components/toast/Success";
import Error from "../../components/toast/Error";
import { useParams } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuth";

function SiteConfig() {
  const { user } = useAuthContext();
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [banners, setBanners] = useState([]);

  const slides = [
    "https://placehold.co/600x400/red/white",
    "https://placehold.co/600x400/orange/white",
    "https://placehold.co/600x400/black/white",
    "https://placehold.co/600x400/blue/white",
    // "https://placehold.co/600x400/blue/red"
  ];
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async(e) => {
    const files = e.target.files;

  if (files.length > 0) {
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append('banners', file);
    });

      try {
        const res = await fetch(`/api/protected/site/${id}/edit/banner`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Failed to upload");
          setSuccess(null);
        } else {
          setSuccess("Banner added successfully!");
        }

      } catch (error) {
        setError(error || "Failed to upload");
      }
    }

    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 7000);
  };
  return (
    <div className='p-4'>
      <div className="flex justify-between items-center border-b-2 border-solid border-[#eee] pb-2">
        <h1 className="text-3xl font-bold text-gray-900">Site Configuration </h1>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={() => setModalOpen(true)}
        >
          Add New Site
        </button>
      </div>
      <div className='py-4'>
        <span className='font-semibold'>{`Banner ( ${slides.length}/5 )`}</span>
        <div className="flex space-x-4 mt-4">
          {slides && slides.map((p, i) => 
            <div key={i} className="flex-1">
              <img src={p} alt="" className='rounded-lg'/>
            </div>
          )}
          <div className="flex-1">
          <button className="border disabled:bg-gray-400 disabled:opacity-30 h-full w-full bg-red-300 hover:bg-red-400 rounded-lg flex items-center justify-center gap-x-2" onClick={triggerFileInput} disabled={slides.length === 5 ? true : false}>
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-5 h-5 text-gray-900" fill='currentColor'><path d="M19,0H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5Zm-3,13h-3v3c0,.553-.448,1-1,1s-1-.447-1-1v-3h-3c-.552,0-1-.447-1-1s.448-1,1-1h3v-3c0-.553,.448-1,1-1s1,.447,1,1v3h3c.552,0,1,.447,1,1s-.448,1-1,1Z"/></svg>
            Add
          </button>
          <input
            className='hidden'
            type="file"
            id="fileInput"
            ref={fileInputRef}
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          </div>
        </div>
      </div>
      {success && <Success message={success} />}
      {error && <Error message={String(error)} />}
    </div>
  )
}

export default SiteConfig
