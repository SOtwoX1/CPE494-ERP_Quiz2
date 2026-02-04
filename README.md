# Project-Koo-Kin

## Description

Project-Koo-Kin
## Technologies Used
### การใช้ git ทำใน dev เเล้วค่อย pull request to main ** สำคัญ
   git init

   git checkout (main/dev) ดึงไฟล์

   git branch (main/dev)
   
   git status
   
   git add .
   
   git commit -m "xxx"
   
   git pull origin (main/dev)
   
   git push origin (main/dev)
### Frontend (React)

The frontend  `src > client`,พอจะมีตัวอย่างอนู่ใน code แต่ถ้าตัวไหนไม่มีลองเองเลย
- **[Ant Design](https://ant.design/):** A design system with an extensive set of UI components for React.
- **[Axios](https://axios-http.com/):** A promise-based HTTP client for making API requests from the browser.
- **[Flowbite](https://flowbite.com/):** A library of UI components built on Tailwind CSS.
- **[Flowbite React](https://flowbite-react.com/):** Flowbite components tailored for React apps.
- **[Framer Motion](https://www.framer.com/motion/):** An animation library for smooth transitions and animations in React.
- **[GSAP](https://greensock.com/gsap/):** A JavaScript animation library that allows you to create high-performance animations.
- **[Moment.js](https://momentjs.com/):** A popular date manipulation library for parsing, validating, and formatting dates.
- **[React Router](https://reactrouter.com/):** A declarative routing library for creating navigation between components.
- **[React Scroll](https://www.npmjs.com/package/react-scroll):** A simple library for adding smooth scroll functionality to React.
- **[React Scroll To Top](https://www.npmjs.com/package/react-scroll-to-top):** A component that allows users to scroll back to the top of the page.
- **[React Spinners](https://www.npmjs.com/package/react-spinners):** A collection of loading spinner components for React.
- **[React Transition Group](https://reactcommunity.org/react-transition-group/):** Provides animations when components enter or exit the DOM.
- **[SweetAlert2](https://sweetalert2.github.io/):** A library for customizable popup boxes, making user interactions more engaging.
- **[Swiper](https://swiperjs.com/):** A modern, touch-enabled slider component for web and mobile applications.

### Backend (Express)

The backend, located in `src > server > main`, backend ลองให้ดูน่าจะยากอ่ะ ลองดูเองก่อนนะ เดี๋ยวมาช่วย ไม่ก็ลองถาม ลูกพี่ Gpt ก่อนเลย ไม่ก็ลองไปเล่น frontend	ดูก่อนจะได้เห็นภาพ
- **[Bcrypt.js](https://github.com/dcodeIO/bcrypt.js):** A password-hashing library to enhance security.
- **[Body-Parser](https://www.npmjs.com/package/body-parser):** Middleware for parsing incoming HTTP request bodies.
- **[CORS](https://www.npmjs.com/package/cors):** Middleware that enables Cross-Origin Resource Sharing for the API.
- **[Cross-Env](https://www.npmjs.com/package/cross-env):** A utility to handle environment variables across different platforms.
- **[Express](https://expressjs.com/):** A minimal web framework for building backend services in Node.js.
- **[JSON Web Token](https://jwt.io/):** A secure method for transmitting information between the backend and frontend.
- **[Multer](https://www.npmjs.com/package/multer):** A middleware for handling file uploads in Express applications.
- **[MySQL2](https://www.npmjs.com/package/mysql2):** A fast and secure MySQL client for interacting with MySQL databases.
- **[Mongoose](https://mongoosejs.com/):** A library for modeling MongoDB data within Node.js applications.

 https://github.com/SOtwoX1/Project-SE.git

Follow these steps to set up the project:

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SOtwoX1/Project-SE.git
   cd project-se

2. Install dependencies: Navigate to both the frontend and backend directories and install the required packages:
    ```bash
    # For the backend frontend
      npm install antd axios flowbite flowbite-react framer-motion gsap moment react-router-dom react-scroll react-scroll-to-top react-spinners react-transition-group sweetalert2 swiper bcryptjs body-parser cors cross-env express jsonwebtoken multer mysql2 mongoose react-slick @mui/material @emotion/react @emotion/styled slick-carousel node-cron browser-image-compression


3. Start dev server:

    ```env
        npm run dev
    
Run the application:


This command will start both the frontend and backend. Open your browser and navigate to http://localhost:3000 to view the application.

