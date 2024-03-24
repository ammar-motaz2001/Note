import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from 'recoil';
import { noteState } from '../NoteAtom/atom';
import Card from 'react-bootstrap/Card';
import Note from '../Notes/note';
export default function Home() {
    const [show, setShow] = useState(false);
    let[note,setNote] = useRecoilState(noteState)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errmsg,setErrMsg]=useState(false)
const [data,setData]=useState([])

    useEffect(()=>{
        addNote()
        getNotes()
    },[])
    function addNote(values){
        console.log(localStorage.getItem("token"))
        axios.post("https://note-sigma-black.vercel.app/api/v1/notes",values,{
            headers:{
                token:`3b8ny__${localStorage.getItem("token")}`
            }
        }).then((res)=>{
            console.log(res)
            if(res.data.msg=="done"){
                handleClose()
                getNotes()
                // console.log(res.data.note.length)
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    function getNotes(){
        console.log(localStorage.getItem("token"))
        axios.get("https://note-sigma-black.vercel.app/api/v1/notes",{
            headers:{
                token:`3b8ny__${localStorage.getItem("token")}`
            }
        }).then((res)=>{
            console.log(res) 
            setNote(res.data.notes.length)
            setData(res.data.notes)
            if(res.data.notes.length<=1){
            setNote(res.data.notes.length)
            setData(res.data.notes)
            }
        }).catch(err=>{
            console.log(err)
        })
    }

  let formik=useFormik({
        initialValues:{
                title:"",
                content:"",
        },

        onSubmit:(values)=>{
            addNote(values)
            
        }
    })

    


  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Your Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
                <input onChange={formik.handleChange} type="text" className='form-control'  id='title' name='title' placeholder='Enter Title to Your Note' />
                <textarea onChange={formik.handleChange} name="content" className='form-control mt-3 pb-3'  id="content" placeholder='Enter Your Content of Note' ></textarea>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant="primary" onClick={formik.handleSubmit}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
        <div className='d-flex justify-content-center mt-3'>
        <button type='submit' onClick={handleShow} className='btn btn-primary ms-0 w-25' >Add Note  <i className="ms-2 fa-solid fa-plus"></i></button>
            
        </div>

       <div className="container">
       <div className="row mt-3">
        {data.map(note=>{
            return <Note note={note}  getNotes={getNotes}/>
        })}
       </div>
       </div>
    </>
  )
}
