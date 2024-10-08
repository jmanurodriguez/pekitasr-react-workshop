# pekitasr-react-workshop
# pekitas-ecotienda

#Pekitas Ecotienda - Ecommerce
This project is an ecommerce platform for natural and eco-friendly products, developed for Pekitas Ecotienda. The application is built using React, Firebase, and Chakra UI, allowing users to explore products, add them to the cart, and make purchases.

## Features

- View products by categories.
- Shopping cart with stock management.
- Purchase process with payment simulation.
- Integration with Firebase for product storage.
- Discounts and installment plans for purchases over a certain amount.
- Product management in Firestore.
## Tech Stack

- HTML5 - Page structure.
- CSS3 - Styles and responsive design.
- JavaScript - Application logic.
- React Router Dom - For handling navigation between pages.
- Chakra UI - UI framework.
- Firebase (Firestore and Hosting) - Real-time database and hosting for the site.
- Cloudinary - Image storage and management.
- Canva - Creation of graphic elements.
- WhatsApp API - Integration for direct contact with users.
- Vite - For efficient project configuration and build




## Installation

npm install

```bash
 git clone https://github.com/username/pekitas-ecotienda.git
 cd pekitas-ecotienda
```
    Requisitos previos
Node.js (v14 o superior)
Una cuenta de Firebase (para la autenticación y Firestore)
Una cuenta de Cloudinary para el almacenamiento de imágenes.
Una cuenta de Canva (si planeas editar o crear nuevos elementos gráficos).
Acceso a la API de WhatsApp para la integración de mensajería.
Configura Firebase y Cloudinary:

Crea un proyecto en Firebase.
Habilita Authentication y Firestore.
Crea una cuenta en Cloudinary y genera tus credenciales.
Crea un archivo .env en la raíz del proyecto y añade las variables de entorno con las credenciales de Firebase y Cloudinary:
## Appendix

Firebase Configuration
Go to the Firebase Console and create a new project.
Enable Firestore and Authentication (Google and Email/Password sign-in methods).
Retrieve the Firebase config credentials from the Firebase Console.
Create a .env file at the root of the project and add the following:

REACT_APP_API_KEY=your-firebase-api-key
REACT_APP_AUTH_DOMAIN=your-auth-domain
REACT_APP_PROJECT_ID=your-project-id
REACT_APP_STORAGE_BUCKET=your-storage-bucket
REACT_APP_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_APP_ID=your-app-id



## Run Locally

Clone the project

```bash
  git clone git clone https://github.com/jmanurodriguez/pekitasr-react-workshop
```

Go to the project directory

```bash
  cd pekitasr-react-workshop
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Deployment

To deploy this project run

```bash
  npm run deploy
```


## Running Tests

To run tests, run the following command

```bash
  npm run dev: Inicia el servidor de desarrollo.
  npm run build: Crea una versión optimizada para producción.
  npm run preview: Previsualiza la app después de haber ejecutado el build.
```


## Authors
GitHub
- https://github.com/jmanurodriguez

Linkedin
- www.linkedin.com/in/juan-manuel-rodriguez-frontend