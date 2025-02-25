import morgan from 'morgan';
import express from 'express';
import cors from 'cors';

import { CONFIG } from './config/config.js';
import { contactRouter } from './routes/contact.routes.js';
import { mongodbProvider } from './providers/mongodb.provider.js';

const app = express();

// Configurar CORS correctamente
app.use(cors({ 
    origin: 'http://localhost:5173',
    methods: ["GET"], 
})
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/contacts', contactRouter);

// Conectar a MongoDB antes de iniciar el servidor
mongodbProvider.connect(CONFIG.MONGO_URI)
    .then(() => {
        app.listen(CONFIG.PORT, () => {
            console.log(`Server running on http://localhost:${CONFIG.PORT}`);
        });
    })
    .catch(error => {
        console.error('Error al conectar con MongoDB:', error);
    });