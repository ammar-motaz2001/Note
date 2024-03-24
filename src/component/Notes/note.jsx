import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useRecoilState } from 'recoil';
import { noteState } from '../NoteAtom/atom';
import { Hinge, JackInTheBox, Roll, Rotate, Slide } from 'react-awesome-reveal';

export default function Note({note,getNotes}) {
    useEffect(()=>{
        getNotes()
    },[])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let[notes,setNote] = useRecoilState(noteState)
    function updateNote(values){
        axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,values,{
            headers:{
                token:`3b8ny__${localStorage.getItem("token")}`
            }
        }).then(res=>{
            console.log(res)
            getNotes()
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            handleClose()
        })
    }
    function deleteNote(){
      axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,{
            headers:{
                token:`3b8ny__${localStorage.getItem("token")}`
            }
        }).then(res=>{
            console.log(res)

            getNotes()
            
        }).catch(err=>{
            console.log(err)
            getNotes()
        })
    }

    let formik=useFormik({
        initialValues:{
                title:"",
                content:"",
        },

        onSubmit:(values)=>{
            
            updateNote(values)
            
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
          <Button type='submit' variant="primary" onClick={formik.handleSubmit} >
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
     <div className="col-6 g-4">
        <Slide>
        <div>
            <Card  >
      <Card.Body className='text-center'>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>
         {note.content}
        </Card.Text>
        <Card.Link onClick={handleShow}  style={{fontSize:25}} href="#"><i className="fa-solid fa-pen-to-square text-warning"></i></Card.Link>
        <Card.Link onClick={()=>deleteNote()} style={{fontSize:25}} href="#"><i  class="fa-solid fa-trash text-danger"></i></Card.Link>
      </Card.Body>
    </Card>
            </div>
        </Slide>
            
        </div> 
    </>
  )
}

