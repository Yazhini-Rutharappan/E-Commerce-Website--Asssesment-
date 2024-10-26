import { Alert, Button, Select, Textarea, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import upload from '../image/upload.jpg';
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
  const [file, setFile] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const filePickerRef = useRef();

  
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUploadError(null);
    } else {
      setImageUploadError('Please select an image');
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setImageUploadError('Please select an image before submitting.');
      return;
    }

    const productData = new FormData(); 
    productData.append('title', formData.title);
    productData.append('description', formData.description);
    productData.append('price', formData.price);
    productData.append('category', formData.category);
    productData.append('number', formData.number);
    productData.append('image', file); 

    try {
      const res = await fetch('/api/product/create', {
        method: 'POST',
        body: productData, 
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      setPublishError(null);
      navigate(`/product/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-3xl w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create a Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div>
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  Title
                </label>
                <TextInput
                  id="title"
                  type="text"
                  placeholder="Enter the Title"
                  className="w-full"
                  required
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Write something"
                  rows={4}
                  className="w-full"
                  required
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                  Price
                </label>
                <TextInput
                  id="price"
                  type="text"
                  placeholder="Enter the price"
                  className="w-full"
                  required
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                  Category
                </label>
                <Select
                  id="category"
                  className="w-full"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="uncategorized">Uncategorized</option>
                  <option value="watch">Watch</option>
                  <option value="shoe">Shoe</option>
                  <option value="bags">Bags</option>
                  <option value="mobile">Mobile</option>
                  <option value="laptop">Laptop</option>
                </Select>
              </div>

              <div>
                <label htmlFor="number" className="block text-gray-700 font-medium mb-2">
                  Quantity
                </label>
                <TextInput
                  id="number"
                  type="text"
                  placeholder="Enter the Quantity"
                  className="w-full"
                  required
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                />
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <div>
                <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={filePickerRef}
                  hidden
                />
                <div className="h-70 w-50 mt-5" onClick={() => filePickerRef.current.click()}>
                  <img src={file ? URL.createObjectURL(file) : upload} alt="Preview" />
                </div>
                {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button type="submit" className="w-full">Create Product</Button>
            {publishError && <Alert className="mt-5" color="failure">{publishError}</Alert>}
          </div>
        </form>
      </div>
    </div>
  );
}
