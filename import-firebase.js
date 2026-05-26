const fs = require('fs');
const path = require('path');

// URL de la base de datos de Firebase Realtime Database
const DB_URL = "https://cuerosportenos-35545-default-rtdb.firebaseio.com/.json";
const jsonPath = path.join(__dirname, 'firebase-import.json');

async function importData() {
    console.log("Iniciando importación a Firebase Realtime Database...");
    
    try {
        // Verificar que el archivo JSON de origen exista
        if (!fs.existsSync(jsonPath)) {
            console.error(`Error: No se encontró el archivo de datos: ${jsonPath}`);
            return;
        }

        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const data = JSON.parse(rawData);

        console.log(`Subiendo catálogo de productos a la base de datos: ${DB_URL}`);
        
        // Ejecutar solicitud HTTP PUT a la API REST de Firebase Realtime Database
        const response = await fetch(DB_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log("\n¡Catálogo importado exitosamente en Firebase Realtime Database!");
            const result = await response.json();
            console.log("\nResumen de datos cargados:");
            console.log(`- Productos: ${Object.keys(result.products || {}).length}`);
            console.log(`- Variantes de color: ${Object.keys(result.product_variants || {}).length}`);
            console.log("\nYa puedes ver e interactuar con estos datos en tu consola de Firebase.");
        } else {
            console.error("Error al importar datos. Estado HTTP:", response.status, response.statusText);
            const errText = await response.text();
            console.error("Detalles de respuesta de Firebase:", errText);
        }
    } catch (error) {
        console.error("Se produjo un error durante la importación:", error);
    }
}

importData();
