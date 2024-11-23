import { useState, useEffect, useRef } from 'react'
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
  const [site, setSite] = useState();
  const [banners, setBanners] = useState([]);

  const fetchSite = async () => {
    const res = await fetch(`/api/protected/site/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      },
    });

    const json = await res.json();
    if (res.ok) {
      setSite(json);
    } else {
      setError(json.error || 'Failed to fetch site');
    }
  };

  useEffect(() => {
    if (user) {
        fetchSite();
    }
  }, [user]);

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
          fetchSite();
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

  const deleteBanner = async(index) => {

    try {
      const res = await fetch(`/api/protected/site/${site._id}/delete/banner`, {
        method: 'DELETE',
        body: JSON.stringify({ bannerIndex: index }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await res.json();
      
      if (!res.ok) {
        setError(json.error || "Failed to delete");
        setSuccess(null);
      } else {
        setSuccess("Banner deleted successfully!");
        fetchSite();
      }

    } catch (error) {
      setError(error || "Failed to delete");
    }

    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 7000);
  }
  return (
    <div className='p-4'>
      {site &&
      <>
      <div className="flex justify-between items-center border-b-2 border-solid border-[#eee] pb-2">
        <h1 className="text-3xl font-bold text-gray-900">{`Site configuration for ${site.name}`}</h1>
      </div>
      <div className='py-4'>
        <span className='font-semibold'>{`Banner ( ${site.banners && site.banners.length}/5 )`}</span>
        <div className="flex space-x-4 mt-4">
          {site.banners && site.banners.map((b, i) => 
            <div key={i} className="flex-1 relative group">
              <img src={`http://localhost:2006/${b.replace(/\\/g, "/")}`} alt={`banner - ${i}`} className='rounded-lg group-hover:opacity-30 cursor-pointer w-full h-full'/>
              <button title='Delete' onClick={() => deleteBanner(i)}>
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" fill='currentColor' className='h-6 w-6 text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'><path d="M17,4V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2V4ZM11,17H9V11h2Zm4,0H13V11h2ZM15,4H9V2h6Z"/></svg>
              </button>
            </div>
          )}
          <div className="flex-1">
          <button className="border disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-30 h-full w-full bg-red-300 hover:bg-red-400 rounded-lg flex items-center justify-center gap-x-2" onClick={triggerFileInput} disabled={site.banners.length === 5 ? true : false}>
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
      </>}
      {success && <Success message={success} />}
      {error && <Error message={String(error)} />}
    </div>
  )
}

export default SiteConfig
