// import Link from 'next/link';
// import { useState, useEffect } from 'react';

// export default function UploadPage(props) {
//    const [status, setStatus] = useState("");

//    useEffect(() => {
//       const uploadForm = document.querySelector('.upload')
//       // const dialogText = document.querySelector('#dialog')

//       uploadForm.addEventListener('submit', function(e) {
//          e.preventDefault()
//          let file = e.target.uploadFile.files[0]
//          let formData = new FormData()
//          formData.append('file', file)
//          fetch('http://localhost:8000/upload-file', {
//             method: 'POST',
//             body: formData
//          })
//          .then(res => res.json())
//          .then(data => {
//             if (data.errors) {
//                alert(data.errors)
//             }
//             else {
//                console.log('upload success !')
//                console.log(data)
//             }
//          })
//       })
//    })
//    useEffect(() => {
//       console.log(status);
//    }, [status])
    
//    return (
//       <div>
//          <Link href="http://localhost:3000">Back to Home</Link>
//          <form className="upload">
//             <input type="file" name="uploadFile" required />
//                   <br/><br/>
//             <input type="submit" className="w-12 hover:bg-violet-600 border-4"/> 
//          </form>    
//          {status==="success" ? (<div>Upload Successful !</div>) 
//             : 
//             (<div className='hidden'></div>)
//          }    
         
//       </div>
//    )
    
// }
