import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./product.css"
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from '../store/action'
import { Empty } from 'antd';


function Productadd() {

  const [formToggle, setformToggle] = useState(false)
  // const [userData, setUserData] = useState()
  const userData = useSelector((e) => e.AdminData)

  const [product, SetProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchIsAuth = () => {
      axios.get('/admin/Dashboard').then((res) => {
        // console.log(res.data)
        if (res.data.status === 401) {
          navigate('/admin/login')
          alert(res.data.message)
        }
      })
        .catch((err) => console.log(err))
    }

    fetchIsAuth()
  }, [navigate])

  useEffect(() => {
    axios.get("/getRestrauntFood")
      .then((response) => {
        // setUserData(response.data.data)
        dispatch({ type: Action.AdminData, payload: response.data.data })
      })
      .catch((error) => console.log(error))
  }, [])

  console.log(userData)
  // console.log(data)


  const handelSubmit = async (e) => {
    e.preventDefault()
    const formdata = new FormData()

    formdata.append('imageTest', product.image)
    formdata.append("name", product.name)
    formdata.append("category", product.category)
    formdata.append("price", product.price)
    formdata.append("description", product.description)


    try {
      await axios.post('/uploadData', formdata)
        .then((res) => {
          alert('Data uploaded successfully')
          setformToggle(false)
        })
    } catch (error) {
      console.log('Error while uploading data', error)
    }
  }


  const handelChange = (e) => {
    const { name, type, files, value } = e.target;
    // console.log(name, type, files, value);
    SetProduct((prevData) => {
      if (type === 'file') {
        return { ...prevData, [name]: files[0] };
      } else {
        return { ...prevData, [name]: value };
      }
    })
  }

  const handleLogout = () => {
    axios.post('/adminLogout').then((res) => {
      alert(res.data.message)
      navigate('/admin/login')
    }).catch((err) => alert(err.message))
  }

  const TruncatedText = ({ text, wordLimit }) => {
      const words = text.split(" ");
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + '...';
      }
      return text;
    };

    const deleteData = (item) => {
      console.log(item._id)

      axios.post('/deleteItem', {id : item._id})
      .then(() => console.log('done'))
      .catch((err) => console.log(err))


    }

  return (

    <>

      <button onClick={() => setformToggle((prev) => !prev)}>Add Item</button>
      <button onClick={handleLogout}>logout</button>

      {
        formToggle &&
        <div className="form-container">
          <h1 className="form-title">Add Product Page<span onClick={() => setformToggle((prev => !prev))} style={{ float: "right", cursor: "pointer" }}>X</span></h1>
          <form onSubmit={handelSubmit} className="product-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" onChange={handelChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select id="category" name="category" onChange={handelChange} className="form-select">
                <option value="" >Choose here</option>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input type="text" id="price" name="price" onChange={handelChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" rows="4" onChange={handelChange} className="form-textarea"></textarea>
            </div>
            <div className="form-group">
              <input type='file' name='image' onChange={handelChange} className="form-file-input" />
            </div>
            <button type="submit" className="form-submit-btn">Submit</button>
          </form>
        </div>
      }


      {
        !formToggle && userData && userData.length === 0 &&
        <Empty />
      }

      <div className='homeproduct'>
        {
          !formToggle && userData && userData.map((item, i) => {
            // console.log(item)
            return (
              <div className='productItem' key={item._id}>
                <div className='restrname' key={item.restrauntName}>
                  <p>By {item.restrauntName}</p>
                  <hr />
                </div>
                <div className='lowersection' key={item.name}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <img src={`http://localhost:5000/${item.image}`}></img>
                  </div>

                  <div className='otherside'>
                    <p className='name'>{item.name}</p>
                    <TruncatedText text={item.description} wordLimit={15} />
                    {/* <p  className='description'>{item.description}</p> */}
                    <h5 style={{marginTop:"10px"}}> ₹{item.price}</h5>
                  </div>
                  <div>
                    <button onClick={() => deleteData(item)} className='deleteitem' >delete</button>
                  </div>
                </div>
              </div>
            )
          })

        }
      </div >


    </>

  )
}

export default Productadd
