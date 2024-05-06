import React from 'react';
import './App.css';
import './bootstrap.5.3.3min.css';
import iconView from './icon-view.svg';
import { saveAs } from 'file-saver';
import { useState, useEffect } from 'react';
import axios from 'axios';

/*
- Pegar o usuário pelo id da url

Icon view
https://www.svgrepo.com/svg/75797/view
*/

// const activities = [
//   {
//     id: 1,
//     name: 'Dragon Ball Z',
//     status: "Enviado",
//     file: 'https://img.odcdn.com.br/wp-content/uploads/2022/07/Dragon-Ball-Z.webp'
//   },
//   {
//     id: 2,
//     name: 'YuYu Hakusho',
//     status: "Enviado",
//     file: 'https://kanto.legiaodosherois.com.br/w760-h398-cfill/wp-content/uploads/2020/07/legiao_g3b9Ok8yNfdo.jpg.webp'
//   },
//   {
//     id: 3,
//     name: 'Street Fighter 2',
//     status: "Em progresso",
//     file: null
//   },
//   {
//     id: 4,
//     name: 'Gunbuster',
//     status: "Enviado",
//     file: 'https://m.media-amazon.com/images/M/MV5BNDIxOTI2YWEtMjljYy00NjkwLTlkNTYtOGY4NjdiNWM2NzRkXkEyXkFqcGdeQXVyMTUwNjU3NzU1._V1_.jpg'
//   },
//   {
//     id: 5,
//     name: 'Crying Freeman',
//     status: "Em progresso",
//     file: null
//   }
// ];
// const user = {
//   id: 1,
//   name: 'Túlio'
// }

const userId = 2;

function App() {
  const [user, setUser] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
     fetch('http://localhost:5022/User?id=' + userId)
        .then((resUser) => resUser.json())
        .then((dataUser) => {
           console.log(dataUser);
           setUser(dataUser);

           fetch('http://localhost:5022/Activity?idUser=' + userId)
              .then((resActivities) => resActivities.json())
              .then((dataActivities) => {
                console.log(dataActivities);
                setActivities(dataActivities);
              })
              .catch((errActivities) => {
                console.log(errActivities.message);
              });

        })
        .catch((errUser) => {
           console.log(errUser.message);
        });
  }, []);

  return(
    <section class='vh-100' style={{'background-color': '#eee'}}>
      <div class='container py-5 h-100'>
        <div class='row d-flex justify-content-center align-items-center h-100'>
          <div class='col col-lg-9 col-xl-7' style={{'width': '90%'}}>
            <div class='card rounded-3'>
              <div class='card-body p-4'>
    
                <h4 class='text-center my-3 pb-3'>Olá {user.name} :)</h4>
    
                <table class='table mb-4'>
                  <thead>
                    <tr>
                      <th scope='col'>Id</th>
                      <th scope='col'>Atividade</th>
                      <th scope='col'>Status</th>
                      <th scope='col'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      activities.map(activity => (
                        <tr key={activity.id}>
                          <th scope='row'>{activity.id}</th>
                          <td>{activity.name}</td>
                          <td>{activity.status}</td>
                          <td>
                            {activity.status === 'Em progresso' ? 
                            (
                              <label for="file-upload" class="custom-file-upload btn btn-light btn-actions">
                                  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-upload' viewBox='0 0 16 16'>
                                    <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5'/>
                                    <path d='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z'/>
                                  </svg>
                                  Upload
                              </label>
                            ) 
                            : null}
                            <input id="file-upload" type="file" accept=".gif,.jpg,.jpeg,.png,.webp" onChange={handleChange}/>
                            {activity.status === 'Enviado' ? 
                            (
                              <button type='submit' data-mdb-button-init data-mdb-ripple-init class='btn btn-light btn-actions' id={'download-' + activity.id} onClick={() => downloadImage(activity.file)}>
                                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-download' viewBox='0 0 16 16'>
                                  <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5'/>
                                  <path d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z'/>
                                </svg>
                                Download
                              </button>
                            ) 
                            : null}
                            {activity.status === 'Enviado' ? 
                            (
                              <button type='submit' data-mdb-button-init data-mdb-ripple-init class='btn btn-light btn-actions' id={'view-' + activity.id} onClick={() => showImage(activity.file)}>
                                <img src={iconView} className="icon-view" alt="icon-view" />
                                Visualizar
                              </button>
                            ) 
                            : null}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
    
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function showImage(srcImage) {
  var imageContainer =
      document.createElement("div");
  imageContainer.className =
      "image-container";

  var image =
      document.createElement("img");
  image.src = srcImage;
  var closeButton =
      document.createElement(
          "button"
      );
  closeButton.textContent = "Fechar";
  closeButton.className =
      "close-btn";
  closeButton.onclick =
      function () {
          document.body.removeChild(
              imageContainer
          );
      };

  imageContainer.appendChild(
      closeButton
  );
  imageContainer.appendChild(image);

  document.body.appendChild(
      imageContainer
  );
}

function downloadImage(srcImage) {
  var arr = srcImage.split('/');
  saveAs(srcImage, arr[arr.length - 1]);
}

// function handleChange(event) {
//   const nameFile = event.target.files[0].name;
//   const typeFile = event.target.files[0].type;
//   const sizeFile = event.target.files[0].size;
//   const sendFile = false;
//   const boundary = '--------------------------' + Math.random().toString(16).substring(2);

//   fetch('http://localhost:5022/File', {
//         method: 'POST',
//         body: JSON.stringify({
//           idActivity: userId,
//           fileName: nameFile,
//           fileData: {
//             contentType: typeFile,
//             contentDisposition: "form-data; name=\"fileData\"; filename=\"" + nameFile + "\"",
//             headers: {
//                 'Content-Disposition': [
//                     "form-data; name=\"fileData\"; filename=\"" + nameFile + "\""
//                 ],
//                 'Content-Type': [
//                   typeFile
//                 ]
//             },
//             length: sizeFile,
//             name: "fileData",
//             fileName: nameFile
//           },
//         }),
//         headers: {
//           'Content-type': 'multipart/form-data; boundary=' + boundary,
//         },
//     })
//         .then((res) => res.json())
//         .then((file) => {
//           sendFile = true;
//         })
//         .catch((err) => {
//           console.log(err.message);
//         });

//   if(sendFile)
//     alert('O arquivo ' + nameFile + ' foi enviado com sucesso!');
//   else
//     alert('Erro ao enviar o arquivo ' + nameFile);
//   console.log(event.target.files[0]);

// }

const handleChange = async (event) => {
  const file = event.target.files[0];
  event.preventDefault();

  const formData = new FormData();
  formData.append('idActivity', '2');
  formData.append('fileName', file.name);
  formData.append('fileData', file);

  const boundary = '---------------------------' + Date.now().toString(16);

  try {
      const response = await axios.post('http://localhost:5022/File', formData, {
          headers: {
              'Content-Type': `multipart/form-data; boundary=${boundary}`,
          },
      });

      console.log('Requisição bem-sucedida:', response.data);
      alert('O arquivo ' + file.name + ' foi enviado com sucesso!');
  } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao enviar o arquivo ' + file.name);
  }

  console.log(file);
}

export default App;
