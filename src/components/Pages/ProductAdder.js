import React, {useState} from 'react'
import {fstore, storage} from '../../Config/Config'
import {Link} from 'react-router-dom'
import './style.css'


const ProductAdder = () => {
  
  const [name, setName] = useState('');
  const [descript, setDescript] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null)
  
  const [EMessage, setEMessage]=useState('');
  const [SMessage, setSMessage]=useState('');
  const [IEMessage, setIEMessage]=useState('');
  
  const types =['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
  const handleImage=(e)=>{
    let IFile = e.target.files[0];
    if(IFile){
      if(IFile&&types.includes(IFile.type)){
        setImage(IFile);
        setIEMessage('');
      }
      else{
        setImage(null);
        setIEMessage('Not valid image type: Only use PNG or JPEG files')
      }
    }
    else{
      console.log("No file selected");
    }
  }

  const handleProducts=(e)=>{
    e.preventDefault();
    const uploadI = storage.ref(`product-images/${image.name}`).put(image);
    uploadI.on('state_changed', snapshot=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
      console.log(progress);
    }, error=>setIEMessage(error.message),()=>{
      storage.ref('product-images').child(image.name).getDownloadURL().then(url=>{
        fstore.collection('Products').add({
          name,
          descript,
          price: Number(price),
          url
        }).then(()=>{
          setSMessage('Product has been added');
          setName('');
          setDescript('');
          setPrice('');
          document.getElementById('ImageFile').value='';
          setIEMessage('');
          setEMessage('');
          setTimeout(()=>{
            setSMessage('');
          }, 3000)
        }).catch(error=>setEMessage(error.message))
      })
    })
  }

  return (
    <div className='container'>
        <br></br>
        <br></br>
        <h1>Add Products</h1>
        <br></br>
        {SMessage&&<>
          <div className='SMSG'>{SMessage}</div>
          <br></br>
        </>}
        <form autoComplete='off' className='form-group' onSubmit={handleProducts}>
        <label>Product Name</label>
        <input type="text"className="form-control" required
        onChange={(e)=>setName(e.target.value)} value={name}></input>
        <br></br>
        <label>Product Description</label>
        <input type="text" className='form-control' required
        onChange={(e)=>setDescript(e.target.value)} value={descript}></input>
        <br></br>
        <label>Product Price</label>
        <input type="text" className='form-control' required
        onChange={(e)=>setPrice(e.target.value)} value={price}></input>
        <br></br>
        <label>Product Image</label>
        <input type='file' className='form-control' id='ImageFile' required
        onChange={handleImage}></input>
        <br></br>
        {IEMessage&&<>
          <br></br>
          <div className='EMSG'>{IEMessage}</div>
        </>}
        <br></br>
        <div>
        <span>Return Home: <Link to="/">Here</Link></span>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
            <button type='submit' className='btn btn-success btn-md'>
                Add Product
            </button>
        </div>
        </div>
        </form>
        {EMessage&&<>
          <br></br>
          <div className='EMSG'>{EMessage}</div>
        </>}
    </div>
  )
}

export default ProductAdder